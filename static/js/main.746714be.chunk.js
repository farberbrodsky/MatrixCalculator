(this["webpackJsonpmatrix-calculator"]=this["webpackJsonpmatrix-calculator"]||[]).push([[0],{19:function(t,e,n){},20:function(t,e,n){"use strict";n.r(e);var s=n(0),r=n(1),i=n.n(r),a=n(12),o=n.n(a),c=(n(19),n(2)),l=n(3),u=n.n(l),h=n(13),d=n(8),f=n(9),b=n(10),v=function(){function t(e,n){Object(f.a)(this,t),this.className="Rational";try{if(void 0===n){var s=e.toString();if(this.str=s,-1!==s.indexOf("/")){if(s.indexOf("/")!==s.length-1)return new t(s.substring(0,s.indexOf("/")),s.substring(s.indexOf("/")+1));s=s.substring(0,s.indexOf("/"))}if(-1!==s.indexOf(".")){this.b=1n;for(var r=0;r<e.length-s.indexOf(".")-1;r++)this.b*=10n}else this.b=1n;return void(this.a=BigInt(s.substring(0,s.indexOf("."))+s.substring(s.indexOf(".")+1)))}e=BigInt(e),n=BigInt(n);var i=1;e<0&&(i*=-1,e*=-1n),n<0&&(i*=-1,n*=-1n);var a=function t(e,n){return n===BigInt(0)?e:t(n,e%n)}(e,n);0n===a?(this.a=BigInt(i)*e,this.b=n):(this.a=BigInt(i)*BigInt(e/a),this.b=n/a)}catch(o){this.a=0,this.b=1}}return Object(b.a)(t,[{key:"add",value:function(e){return"Rational"===e.className?new t(this.a*e.b+this.b*e.a,this.b*e.b):e.add(this)}},{key:"sub",value:function(e){return new t(this.a*e.b-this.b*e.a,this.b*e.b)}},{key:"neg",value:function(){return new t(-this.a,this.b)}},{key:"mul",value:function(e){return"Rational"===e.className?new t(this.a*e.a,this.b*e.b):e.mul(this)}},{key:"opposite",value:function(){return new t(this.b,this.a)}},{key:"toString",value:function(){return this.str&&"0"===this.str[0]&&-1===this.str.indexOf(".")&&(this.str=this.str.substring(1)),this.str?this.str:1n!==this.b?this.a.toString()+"/"+this.b.toString():this.a.toString()}},{key:"isZero",value:function(){return 0n===this.a}},{key:"isOne",value:function(){return this.a===this.b}}]),t}();function m(t){return function(){function e(n){Object(f.a)(this,e),this.className="Z"+t.toString(),this.x=n%t}return Object(b.a)(e,[{key:"add",value:function(n){return n.className===this.className?new e((this.x+n.x)%t):"Real"===n.className?new e((this.x+Math.floor(n.x))%t):"Rational"===n.className&&1n===n.b?new e(this.x+Number(n.a)):n.add(this)}},{key:"sub",value:function(t){return this.add(t.neg())}},{key:"mul",value:function(t){return t.className===this.className?new e(this.x*t.x):"Real"===t.className?new e(this.x*Math.floor(t.x)):"Rational"===t.className&&1n===t.b?new e(this.x*Number(t.a)):t.mul(this)}},{key:"neg",value:function(){return new e(t-this.x)}},{key:"opposite",value:function(){for(var n=1;n<t;n++)if(this.x*n%t===1)return new e(n)}},{key:"toString",value:function(){return this.x.toString()}},{key:"isZero",value:function(){return 0===this.x}},{key:"isOne",value:function(){return 1===this.x}}]),e}()}var j=function(){function t(e,n,s){Object(f.a)(this,t),this.className="Matrix",this.mat=e,this.rows=n,this.cols=s}return Object(b.a)(t,[{key:"getItem",value:function(t,e){return this.mat[t-1+(e-1)*this.rows]}},{key:"setItem",value:function(t,e,n){this.mat[t-1+(e-1)*this.rows]=n}},{key:"toString",value:function(){for(var t=new Array(this.cols).fill(0),e=1;e<=this.rows;e++)for(var n=1;n<=this.cols;n++){var s=this.getItem(e,n).toString().length;s>t[n]&&(t[n]=s)}for(var r="",i=1;i<=this.rows;i++){for(var a=1;a<=this.cols;a++){var o=this.getItem(i,a).toString();r+=o=o.padEnd(t[a]," "),a!==this.cols&&(r+=" ")}i!==this.rows&&(r+="\n")}return r}},{key:"add",value:function(e){for(var n=t.Zero(Math.min(this.rows,e.rows),Math.min(this.cols,e.cols)),s=1;s<=n.rows;s++)for(var r=1;r<=n.cols;r++)n.setItem(s,r,this.getItem(s,r).add(e.getItem(s,r)));return n}},{key:"mul",value:function(e){for(var n=t.Zero(this.rows,e.cols),s=1;s<=this.rows;s++)for(var r=1;r<=e.cols;r++){for(var i=this.getItem(s,1).mul(e.getItem(1,r)),a=2;a<=this.cols;a++){var o=this.getItem(s,a).mul(e.getItem(a,r));i=i.add(o)}n.setItem(s,r,i)}return n}},{key:"minor",value:function(e,n){for(var s=t.Zero(this.rows-1,this.cols-1),r=1;r<=this.rows-1;r++)for(var i=1;i<=this.cols-1;i++){var a=r;r>=e&&(a+=1);var o=i;i>=n&&(o+=1),s.setItem(r,i,this.getItem(a,o))}return s}},{key:"det",value:function(){for(var t=this.rowReduce(),e=Object(c.a)(t,2),n=e[0],s=e[1],r=1;r<=s.rows;r++)if(s.getItem(r,r).isZero())return new v(0n,1n);var i,a=new v(1n,1n),o=Object(d.a)(n);try{for(o.s();!(i=o.n()).done;){var l=i.value;"swap"===l[0]?a=a.neg():"mul"===l[0]&&(a=a.mul(l[2].opposite()))}}catch(u){o.e(u)}finally{o.f()}return a}},{key:"adj",value:function(){for(var e=t.Zero(this.cols,this.rows),n=1;n<=this.rows;n++)for(var s=1;s<=this.cols;s++){var r=new v(Math.pow(-1,s+n)).mul(this.minor(s,n).det());e.setItem(n,s,r)}return e}},{key:"swapRowsInplace",value:function(t,e){for(var n=1;n<=this.cols;n++){var s=this.getItem(t,n);this.setItem(t,n,this.getItem(e,n)),this.setItem(e,n,s)}}},{key:"addRowInplace",value:function(t,e,n){for(var s=1;s<=this.cols;s++)this.setItem(t,s,this.getItem(t,s).add(n.mul(this.getItem(e,s))))}},{key:"multiplyRowInplace",value:function(t,e){for(var n=1;n<=this.cols;n++)this.setItem(t,n,e.mul(this.getItem(t,n)))}},{key:"applyRowOperation",value:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),s=1;s<e;s++)n[s-1]=arguments[s];"swap"===t?this.swapRowsInplace.apply(this,n):"add"===t?this.addRowInplace.apply(this,n):"mul"===t&&this.multiplyRowInplace.apply(this,n)}},{key:"rowReduce",value:function(){for(var t=this.clone(),e=[],n=t.rows+1,s=1;s<=n-1;s++){for(var r=!0,i=1;i<=t.cols;i++)if(!t.getItem(s,i).isZero()){r=!1;break}r&&(n-=1,t.swapRowsInplace(s,n),e.push(["swap",s,n]))}for(var a=1,o=1;o<=t.cols;o++){var c=void 0,l=!1;for(c=a;c<=t.rows;c++)if(!t.getItem(c,o).isZero()){l=!0;break}if(l){c!==a&&(t.swapRowsInplace(c,a),e.push(["swap",c,a]),c=a),a+=1;var u=t.getItem(c,o);if(!u.isOne()&&!u.isZero()){var h=u.opposite();t.multiplyRowInplace(c,h),e.push(["mul",c,h])}for(var d=1;d<=t.rows;d++)if(d!==c&&!t.getItem(d,o).isZero()){var f=t.getItem(d,o).neg();t.addRowInplace(d,c,f),e.push(["add",d,c,f])}}}return[e,t]}},{key:"linearlyIndependentRows",value:function(){for(var e=this.rowReduce(),n=Object(c.a)(e,1)[0],s=this.clone(),r=[0],i=1;i<=this.cols;i++)r.push(i);var a,o=Object(d.a)(n);try{for(o.s();!(a=o.n()).done;){var l=a.value;if("mul"===l[0])s.applyRowOperation("mul",r[l[1]],l[2]);else if("add"===l[0])s.applyRowOperation("add",r[l[1]],r[l[2]],l[3]);else if("swap"===l[0]){var u=r[l[1]];r[l[1]]=r[l[2]],r[l[2]]=u}}}catch(x){o.e(x)}finally{o.f()}for(var h=[],f=0,b=1;b<=s.rows;b++){for(var v=[],m=!0,j=1;j<=s.cols;j++)s.getItem(b,j).isZero()||(m=!1),v.push(this.getItem(b,j));m||(f+=1,h=h.concat(v))}return new t(h,this.cols,f).transpose()}},{key:"transpose",value:function(){for(var e=t.Zero(this.cols,this.rows),n=1;n<=this.cols;n++)for(var s=1;s<=this.rows;s++)e.setItem(n,s,this.getItem(s,n));return e}},{key:"inverse",value:function(){if(this.rows===this.cols){for(var t=this.rows,e=this.rowReduce(),n=Object(c.a)(e,2),s=n[0],r=n[1],i=1;i<=t;i++)if(!r.getItem(i,i).isOne())return;var a,o=Object(d.a)(s);try{for(o.s();!(a=o.n()).done;){var l=a.value;r.applyRowOperation.apply(r,Object(h.a)(l))}}catch(u){o.e(u)}finally{o.f()}return r}}},{key:"clone",value:function(){return new t(this.mat.slice(),this.rows,this.cols)}}],[{key:"Identity",value:function(e,n,s){for(var r=[],i=0;i<e;i++)for(var a=0;a<e;a++)r.push(a===i?s||new v(1n,1n):n||new v(0n,1n));return new t(r,e,e)}},{key:"Zero",value:function(e,n,s){return new t(new Array(e*n).fill(s||new v(0n,1n)),e,n)}}]),t}();function x(t,e){for(var n=[],s=t;s<=e;s++)n.push(s);return n}function p(t){var e=t.matrix,n=t.editable,r=t.field,i=t.onChange;function a(t,n,s){var a=s.target.value,o=e.clone();o.setItem(t,n,new r(a)),i(o)}function o(t,n){for(var s=j.Zero(t,n),r=1;r<=e.rows;r++)for(var a=1;a<=e.cols;a++)s.setItem(r,a,e.getItem(r,a));i(s)}var c=Object(s.jsx)("table",{children:Object(s.jsx)("tbody",{children:x(1,e.rows).map((function(t){return Object(s.jsx)("tr",{children:x(1,e.cols).map((function(r){var i=e.getItem(t,r).toString(),o=n?Object(s.jsx)("input",{style:{width:i.length+"ch"},onChange:a.bind(null,t,r),value:i}):Object(s.jsx)("span",{children:i});return Object(s.jsx)("td",{children:o},t.toString()+","+r.toString())}))},t)}))})});return Object(s.jsxs)("div",{className:u.a.MatrixComponent,children:[Object(s.jsx)("div",{className:u.a.leftParentheses}),n?Object(s.jsxs)("div",{className:u.a.buttonContainer,children:[c,Object(s.jsx)("button",{className:u.a.colAdd,onClick:function(){return o(e.rows,e.cols+1)},children:"+"}),Object(s.jsx)("button",{className:u.a.colSub,onClick:function(){return o(e.rows,e.cols-1)},children:"-"}),Object(s.jsx)("button",{className:u.a.rowAdd,onClick:function(){return o(e.rows+1,e.cols)},children:"+"}),Object(s.jsx)("button",{className:u.a.rowSub,onClick:function(){return o(e.rows-1,e.cols)},children:"-"}),Object(s.jsx)("button",{className:u.a.rowColAdd,onClick:function(){return o(e.rows+1,e.cols+1)},children:"+"}),Object(s.jsx)("button",{className:u.a.rowColSub,onClick:function(){return o(e.rows-1,e.cols-1)},children:"-"})]}):c,Object(s.jsx)("div",{className:u.a.rightParentheses})]})}var w=n(7),O=n.n(w);function g(t){var e=t.value,n=e[0],r=e[1];return Object(s.jsxs)("div",{children:[n.map((function(t){return"mul"===(e=t)[0]?Object(s.jsxs)("p",{children:["R",e[1]," to R",e[1]," * ",e[2].toString()]}):"add"===e[0]?Object(s.jsxs)("p",{children:["R",e[1]," to R",e[1]," + ",e[2]," * ",(e[3]||1).toString()]}):"swap"===e[0]?Object(s.jsxs)("p",{children:["swap R",e[1]," and R",e[2]]}):void 0;var e})),Object(s.jsx)("p",{children:"Result:"}),Object(s.jsx)(p,{matrix:r})]})}function y(t){return Object(s.jsxs)("div",{className:O.a.matrixWithButtons,children:[Object(s.jsx)("div",{className:O.a.alignCenter,children:Object(s.jsx)(p,{matrix:t.matrix,editable:t.editable,field:t.field,onChange:t.onChange})}),Object(s.jsxs)("div",{children:[Object(s.jsxs)("div",{className:O.a.buttons,children:[Object(s.jsx)("button",{onClick:function(){return t.setResult({type:"matrix",value:t.matrix.transpose()})},children:"Transpose"}),Object(s.jsx)("button",{onClick:function(){return t.setResult({type:"element",value:Object(s.jsx)(g,{value:t.matrix.rowReduce()})})},children:"Row Reduce"})]}),Object(s.jsxs)("div",{className:O.a.buttons,style:{display:t.matrix.rows===t.matrix.cols?"block":"none"},children:[Object(s.jsx)("h3",{children:"Square Matrix Operations"}),Object(s.jsx)("button",{onClick:function(){var e=t.matrix.inverse();e?t.setResult({type:"matrix",value:e}):t.setResult({type:"text",value:"Not invertible."})},children:"Inverse"}),Object(s.jsx)("button",{onClick:function(){return t.setResult({type:"text",value:t.matrix.det().toString()})},children:"det"}),Object(s.jsx)("button",{onClick:function(){return t.setResult({type:"matrix",value:t.matrix.adj()})},children:"adj"})]})]})]})}function I(t){var e=t.fieldName,n=t.setField,i=Object(r.useState)(2),a=Object(c.a)(i,2),o=a[0],l=a[1];return Object(s.jsxs)("div",{children:[Object(s.jsxs)("select",{value:e,onChange:function(t){var e=t.target.value;"Rational"===e?n(e,v):"Zn"===e&&n(e,m(o))},children:[Object(s.jsx)("option",{value:"Rational",children:"Q"}),Object(s.jsx)("option",{value:"Zn",children:"Zn"})]}),"Zn"===e?Object(s.jsx)("input",{value:o,onChange:function(t){var e=parseInt(t.target.value);try{e=parseInt(e)}catch(s){return}e>=2&&(l(e),n("Zn",m(e)))}}):null]})}var _=n(4),k=n.n(_);var C=function(){var t=Object(r.useState)(j.Zero(3,3,new v(0))),e=Object(c.a)(t,2),n=e[0],i=e[1],a=Object(r.useState)(j.Zero(3,3,new v(0))),o=Object(c.a)(a,2),l=o[0],u=o[1],h=Object(r.useState)(void 0),d=Object(c.a)(h,2),f=d[0],b=d[1],m=Object(r.useState)("Rational"),x=Object(c.a)(m,2),w=x[0],O=x[1],g=Object(r.useState)([v]),_=Object(c.a)(g,2),C=_[0],R=_[1],N=void 0;return f&&"matrix"===f.type?N=Object(s.jsxs)("div",{children:[Object(s.jsx)(p,{matrix:f.value}),Object(s.jsx)("br",{}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:function(){return i(f.value)},children:"Save as A"}),Object(s.jsx)("button",{onClick:function(){return u(f.value)},children:"Save as B"})]}):f&&"text"===f.type?N=Object(s.jsx)("p",{children:f.value}):f&&"element"===f.type&&(N=f.value),Object(s.jsxs)("div",{className:"App",children:[Object(s.jsxs)("div",{style:{display:"flex"},children:[Object(s.jsx)("div",{className:k.a.flexGrow,children:Object(s.jsx)(I,{fieldName:w,setField:function(t,e){i(j.Zero(3,3,new e(0))),u(j.Zero(3,3,new e(0))),R([e]),O(t)}})}),Object(s.jsx)("h1",{className:k.a.title,children:"Matrisha"}),Object(s.jsx)("div",{className:k.a.flexGrow})]}),Object(s.jsxs)("div",{className:k.a.twoMatrices,children:[Object(s.jsx)("div",{className:k.a.leftMatrix,children:Object(s.jsx)(y,{matrix:n,editable:!0,field:C[0],onChange:function(t){i(t)},setResult:b})}),Object(s.jsxs)("div",{className:k.a.twoMatricesOperators,children:[Object(s.jsx)("button",{onClick:function(){var t=n;i(l),u(t)},children:"Swap A, B"}),n.cols===l.rows?Object(s.jsx)("button",{onClick:function(){return b({type:"matrix",value:n.mul(l)})},children:"A \xd7 B"}):null,n.rows===l.rows&&n.cols===l.cols?Object(s.jsx)("button",{onClick:function(){return b({type:"matrix",value:n.add(l)})},children:"A + B"}):null]}),Object(s.jsx)("div",{className:k.a.rightMatrix,children:Object(s.jsx)(y,{matrix:l,editable:!0,field:C[0],onChange:function(t){u(t)},setResult:b})})]}),Object(s.jsx)("h1",{children:"Result:"}),N]})};o.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(C,{})}),document.getElementById("root"))},3:function(t,e,n){t.exports={MatrixComponent:"MatrixComponent_MatrixComponent__1A9Dz",leftParentheses:"MatrixComponent_leftParentheses__2Cys5",rightParentheses:"MatrixComponent_rightParentheses__2RQZm",columnAdd:"MatrixComponent_columnAdd__1Ov0e",buttonContainer:"MatrixComponent_buttonContainer__2eUZf",colAdd:"MatrixComponent_colAdd__1PsVU",colSub:"MatrixComponent_colSub__3RB3r",rowAdd:"MatrixComponent_rowAdd__2mklE",rowSub:"MatrixComponent_rowSub__2yFTu",rowColAdd:"MatrixComponent_rowColAdd__1WxXF",rowColSub:"MatrixComponent_rowColSub__1Iugk"}},4:function(t,e,n){t.exports={title:"App_title__-GfWs",flexGrow:"App_flexGrow__1-SFD",twoMatrices:"App_twoMatrices__rT6IG",twoMatricesOperators:"App_twoMatricesOperators__WZ2B7",leftMatrix:"App_leftMatrix__lGX0E",rightMatrix:"App_rightMatrix__1n1BS"}},7:function(t,e,n){t.exports={buttons:"MatrixWithButtons_buttons__15Ie6",matrixWithButtons:"MatrixWithButtons_matrixWithButtons__blZ_-",alignCenter:"MatrixWithButtons_alignCenter__mm8xY"}}},[[20,1,2]]]);
//# sourceMappingURL=main.746714be.chunk.js.map