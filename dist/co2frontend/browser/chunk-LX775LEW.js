import{a as U}from"./chunk-K2EP6CIS.js";import{$a as M,Aa as v,Bb as _,Ea as d,Kb as E,La as u,Lb as S,Mb as q,Na as e,Nb as I,Oa as n,Ob as O,Pb as P,Qb as w,Sb as y,Ta as b,Tb as A,Ua as c,Ub as D,Vb as N,Wb as R,Xb as k,Yb as z,Za as i,_a as m,ab as p,bb as g,cb as x,sa as s,ta as C,zb as h}from"./chunk-HKPRPG64.js";function T(o,r){if(o&1&&(e(0,"p",12),i(1),n()),o&2){let a=c();s(),m(a.errorMessage)}}function V(o,r){if(o&1&&(e(0,"p",13),i(1),n()),o&2){let a=c();s(),m(a.successMessage)}}function W(o,r){if(o&1&&(e(0,"div",14)(1,"h3"),i(2,"Risultato:"),n(),e(3,"p"),i(4,"Il tuo consumo di dati corrisponde a "),e(5,"strong",15),i(6),n(),i(7," di CO\u2082."),n(),e(8,"p")(9,"em"),i(10),n()()()),o&2){let a=c();s(6),M("",a.co2Result," kg"),s(4),m(a.getEquivalence())}}var G=class o{constructor(r){this.co2Service=r}dataAmount=null;dataUnit="Gb";co2Result=null;currentDate="";userId=null;successMessage="";equivalences=[{max:10,text:"Equivale a un viaggio in auto di 50 km."},{max:20,text:"Equivale a caricare uno smartphone per un anno."},{max:50,text:"Equivale a un viaggio in auto di 200 km."},{max:100,text:"Equivale all'uso di un laptop per un mese."},{max:150,text:"Equivale a tre ore di volo su un aereo commerciale."},{max:200,text:"Equivale all'uso di un forno elettrico per due mesi."},{max:300,text:"Equivale a un viaggio in treno da Roma a Berlino."},{max:400,text:"Equivale al consumo di una lampadina LED per cinque anni."},{max:500,text:"Equivale all'uso di un frigorifero per un anno."},{max:600,text:"Equivale a fare 10 lavatrici con acqua calda."},{max:700,text:"Equivale al consumo energetico di un router Wi-Fi per tre anni."},{max:800,text:"Equivale a un mese di riscaldamento domestico medio."},{max:900,text:"Equivale a guardare 400 ore di streaming in HD."},{max:1e3,text:"Equivale a un viaggio andata e ritorno in auto da Milano a Napoli."},{max:1200,text:"Equivale a lasciare il computer acceso per un anno."},{max:1400,text:"Equivale a cucinare con un forno elettrico per 50 ore."},{max:1600,text:"Equivale all'energia consumata da una famiglia in una settimana."},{max:1800,text:"Equivale a un anno di ricarica di un'auto elettrica per 10.000 km."},{max:2e3,text:"Equivale al consumo di energia di una casa per un mese."}];errorMessage="";onSubmit(){if(this.errorMessage="",this.successMessage="",this.dataAmount!==null&&this.dataAmount>0&&this.dataAmount<=2e3&&this.dataUnit){this.co2Result=this.dataUnit==="Mb"?this.dataAmount/1024*.02*475:this.dataAmount*.02*475;let r=new Date;this.currentDate=r.toISOString();let a={user_id:sessionStorage.getItem("userId"),co2_amount:this.co2Result,date:this.currentDate};this.co2Service.saveCo2Data(a).subscribe({next:t=>{this.co2Result=t.co2_amount,this.successMessage="CO\u2082 salvata!",this.errorMessage=""},error:t=>{console.error("Errore durante il salvataggio dei dati:",t),t.status===409?this.errorMessage="Hai gi\xE0 inserito un valore di CO\u2082 per oggi.":this.errorMessage="Errore durante il salvataggio dei dati. Riprova."}})}else this.dataAmount!==null&&this.dataAmount>2e3?this.errorMessage="Devi rimanere nei limiti di 2000 GB.":this.errorMessage="Per favore, compila tutti i campi correttamente."}getEquivalence(){if(this.co2Result!==null){for(let r of this.equivalences)if(this.co2Result<=r.max)return r.text}return""}static \u0275fac=function(a){return new(a||o)(C(U))};static \u0275cmp=v({type:o,selectors:[["app-co2-input"]],decls:19,vars:5,consts:[[1,"co2-input-container"],[3,"ngSubmit"],["for","data-amount"],["type","number","id","data-amount","name","dataAmount","placeholder","Inserisci il consumo","min","0","max","2000","required","",3,"ngModelChange","ngModel"],["for","data-unit"],["id","data-unit","name","dataUnit","required","",3,"ngModelChange","ngModel"],["value","Mb"],["value","Gb"],["class","error-message",4,"ngIf"],["class","success-message",4,"ngIf"],["type","submit"],["class","result",4,"ngIf"],[1,"error-message"],[1,"success-message"],[1,"result"],[1,"co2-amount"]],template:function(a,t){a&1&&(e(0,"div",0)(1,"h2"),i(2,"Inserisci il consumo di dati nell'ultimo mese"),n(),e(3,"form",1),b("ngSubmit",function(){return t.onSubmit()}),e(4,"label",2),i(5,"Consumo di dati (max 2000 GB):"),n(),e(6,"input",3),x("ngModelChange",function(l){return g(t.dataAmount,l)||(t.dataAmount=l),l}),n(),e(7,"label",4),i(8,"Unit\xE0:"),n(),e(9,"select",5),x("ngModelChange",function(l){return g(t.dataUnit,l)||(t.dataUnit=l),l}),e(10,"option",6),i(11,"Mb"),n(),e(12,"option",7),i(13,"Gb"),n()(),d(14,T,2,1,"p",8)(15,V,2,1,"p",9),e(16,"button",10),i(17,"Calcola e Salva CO\u2082"),n()(),d(18,W,11,2,"div",11),n()),a&2&&(s(6),p("ngModel",t.dataAmount),s(3),p("ngModel",t.dataUnit),s(5),u("ngIf",t.errorMessage),s(),u("ngIf",t.successMessage),s(3),u("ngIf",t.co2Result!==null))},dependencies:[z,P,A,D,E,w,y,S,q,k,R,N,O,I,_,h],styles:[".co2-input-container[_ngcontent-%COMP%]{max-width:400px;margin:50px auto;padding:20px;border:1px solid #4caf50;border-radius:8px;box-shadow:0 4px 10px #00800033;background:linear-gradient(to bottom,#e8f5e9,#c8e6c9);font-family:Arial,sans-serif}.success-message[_ngcontent-%COMP%]{color:green;font-size:1rem;margin-top:10px}.error-message[_ngcontent-%COMP%]{color:red;font-size:1rem;margin-top:10px}h2[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px;color:#2e7d32;font-size:1.5rem;font-weight:700}label[_ngcontent-%COMP%]{display:block;margin:10px 0 5px;color:#388e3c;font-weight:700}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:4px;background-color:#f1f8e9;font-size:1rem;box-sizing:border-box}input[_ngcontent-%COMP%]:focus, select[_ngcontent-%COMP%]:focus{border-color:#4caf50;outline:none;box-shadow:0 0 5px #4caf5080}button[_ngcontent-%COMP%]{width:100%;padding:12px;background-color:#4caf50;color:#fff;border:none;border-radius:4px;font-size:1.1rem;cursor:pointer;font-weight:700;transition:background-color .3s,transform .2s}button[_ngcontent-%COMP%]:hover{background-color:#388e3c;transform:scale(1.05)}.result[_ngcontent-%COMP%]{margin-top:20px;padding:15px;border:1px solid #4caf50;background-color:#e8f5e9;border-radius:8px;text-align:center;color:#2e7d32;font-weight:700}.co2-amount[_ngcontent-%COMP%]{color:#1b5e20;font-weight:700;font-size:1.3rem}.current-date[_ngcontent-%COMP%]{margin-top:10px;color:#555;font-size:1rem}@media (max-width: 768px){.co2-input-container[_ngcontent-%COMP%]{margin:20px auto;padding:15px;border-radius:6px}button[_ngcontent-%COMP%]{padding:10px;font-size:1rem}input[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{font-size:.9rem}}"]})};export{G as Co2InputComponent};
