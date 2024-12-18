import './polyfills.server.mjs';
import{I as r,N as a,Xb as s}from"./chunk-B4AJPWR3.mjs";var i=class e{constructor(t){this.http=t}apiUrl="https://co2-unimore.glitch.me/data";saveCo2Data(t){return this.http.post(`${this.apiUrl}/co2`,t,{headers:{Authorization:`Bearer ${sessionStorage.getItem("authToken")}`}})}getAllUsers(){return this.http.get(`${this.apiUrl}/users`,{headers:{Authorization:`Bearer ${sessionStorage.getItem("authToken")}`}})}getAllCo2(){return this.http.get(`${this.apiUrl}/getAllco2`,{headers:{Authorization:`Bearer ${sessionStorage.getItem("authToken")}`}})}getCo2ByUserId(t){return this.http.get(`${this.apiUrl}/co2/${t}`,{headers:{Authorization:`Bearer ${sessionStorage.getItem("authToken")}`}})}deleteCo2Data(t){return this.http.delete(`${this.apiUrl}/co2/${t}`,{headers:{Authorization:`Bearer ${sessionStorage.getItem("authToken")}`}})}deleteUser(t){return this.http.delete(`${this.apiUrl}/users/${t}`,{headers:{Authorization:`Bearer ${sessionStorage.getItem("authToken")}`}})}static \u0275fac=function(o){return new(o||e)(a(s))};static \u0275prov=r({token:e,factory:e.\u0275fac,providedIn:"root"})};export{i as a};
