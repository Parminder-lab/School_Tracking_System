# Amardeep Public Senior Secondary School — Bus Tracking

This is a GitHub Pages-ready web app scaffold with three separate portals:
- `driver.html` — authenticated driver; shares GPS for the driver's assigned bus.
- `parents.html` — authenticated parent; sees only assigned bus(es), live/latest location, straight-line distance from their own location, and a rough time estimate.
- `management.html` — authenticated management; sees all 10 buses, speed, distance to school and estimated arrival.

## Important before launch
This package is source code, not a live deployed service. It needs your own Firebase project, school coordinates, user accounts and GitHub repository setup. Do not publish until the security rules and test accounts have been checked.

## 1. Configure Firebase
1. Go to https://console.firebase.google.com/ and create a project.
2. Add a Web App and copy its config into `firebase-config.js`.
3. Enable **Authentication → Email/Password**.
4. Create a **Cloud Firestore** database.
5. In Firestore Rules, publish the contents of `firestore.rules`.
6. In `firebase-config.js`, set `SCHOOL_LOCATION.lat` and `.lng` to the exact school coordinates. These are essential for correct management distance and ETA.

## 2. Create the 10 bus IDs
Use these exact IDs in Firestore documents under collection `buses`:
`Bus 01`, `Bus 02`, ... `Bus 10`.
The app can create the location documents when drivers start tracking.

## 3. Create user accounts and profiles
Create users in Firebase Authentication (Email/Password). Then create a matching Firestore document in `users` with the document ID equal to that user's Authentication UID. Profiles are created manually by school management in the Firebase Console. Never put passwords in Firestore.

Example driver profile:
```json
{ "role": "driver", "name": "Driver One", "busId": "Bus 01" }
```
Example parent profile:
```json
{ "role": "parent", "name": "Parent One", "busIds": ["Bus 01"] }
```
Example management profile:
```json
{ "role": "management", "name": "Transport Admin" }
```
A parent may have more than one assigned bus in `busIds`. A driver is assigned exactly one bus in `busId`.

## 4. Publish with GitHub Pages
1. Create a private or public GitHub repository (private repository visibility does not make a GitHub Pages website private).
2. Upload all files in this folder to the repository root.
3. In repository **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. Wait for the HTTPS Pages URL. The links will be:
   - Home: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`
   - Driver: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/driver.html`
   - Parents: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/parents.html`
   - Management: `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/management.html`

## 5. Security and privacy checklist
- Use individual accounts; do not share a single driver password among all drivers.
- Register each parent and assign only the correct `busIds`.
- Give the management role only to authorized staff.
- Keep Firestore rules as supplied; test with a driver, parent and management account before real use.
- Do not place service-account keys or admin credentials in this repository.
- Consider limiting parent access to school hours and adding an emergency contact/consent process before launch.
- If you want a private GitHub Pages site, GitHub Pages itself is not an access-control system. Authentication in this app protects the data, but the HTML pages themselves are publicly reachable.

## How tracking works and limitations
- Driver signs in, grants GPS permission and taps **Start tracking**. A web page cannot silently start GPS just because a link was opened; browser permission and a user action are required.
- Keep the page open and screen awake during the trip. Mobile browsers may suspend location updates when backgrounded or the screen is locked. For reliable background tracking, a native driver app or managed device solution may be needed.
- Parents must tap **Use my current location** to calculate distance from their own position. It is straight-line distance, not road distance. ETA is a rough estimate using 30 km/h, not a guaranteed arrival time.
- Management distance and ETA use the school coordinates. ETA uses the driver's GPS speed when available, with a 30 km/h fallback. GPS speed may be unavailable or noisy.
- This starter uses OpenStreetMap's embedded map and requires internet access. Review OpenStreetMap tile/usage policies before high-volume production deployment.
- Location is sensitive personal data. Obtain driver/parent consent, publish a privacy notice, define retention, and restrict access before production use.
