import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, collection, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";
const app=initializeApp(firebaseConfig);
export const auth=getAuth(app), db=getFirestore(app);
export {signInWithEmailAndPassword,signOut,onAuthStateChanged,doc,getDoc,setDoc,updateDoc,collection,onSnapshot,serverTimestamp};
export async function profileFor(user){const s=await getDoc(doc(db,"users",user.uid));if(!s.exists())throw new Error("Your account has not been registered by school management.");return s.data();}
export function kmBetween(a,b){const R=6371,toRad=x=>x*Math.PI/180,dLat=toRad(b.lat-a.lat),dLng=toRad(b.lng-a.lng);const x=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLng/2)**2;return 2*R*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));}
export function fmtTime(min){if(!Number.isFinite(min))return "—";if(min<1)return "Less than 1 min";return `${Math.round(min)} min`;}
export function ageText(ts){if(!ts)return "No update yet";const d=ts.toDate?ts.toDate():new Date(ts);const sec=Math.max(0,Math.round((Date.now()-d.getTime())/1000));return sec<60?`${sec}s ago`:`${Math.round(sec/60)} min ago`;}
