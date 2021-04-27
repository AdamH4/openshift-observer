(function(){"use strict";var e={1379:function(e,n,t){t.r(n),t.d(n,{default:function(){return ie}});var o=t(5393),i=(0,o.Wm)("div",{id:"graph"},null,-1),a={class:"container"};function r(e,n,t,r,s,d){var c=(0,o.up)("PodDetail"),l=(0,o.up)("Accordion");return(0,o.wg)(),(0,o.j4)(o.HY,null,[i,(0,o.Wm)(c,{pod:e.selectedPod,open:e.dialog,onCloseDialog:n[1]||(n[1]=function(n){return e.dialog=!1})},null,8,["pod","open"]),(0,o.Wm)("div",a,[d.accordionItems?((0,o.wg)(),(0,o.j4)(l,{key:0,items:d.accordionItems},null,8,["items"])):(0,o.ry)("",!0)])],64)}var s=t(1641),d=t(7171),c=(t(5666),t(7941),t(4747),t(1249),(0,o.HX)("data-v-0b944f88"));(0,o.dD)("data-v-0b944f88");var l={key:0},u={class:"dialog__wrapper"},p={class:"dialog__card"},f={class:"dialog__header"},v={class:"dialog__content"},m={class:"pod__description"},g={class:"list__item first__name"},h=(0,o.Wm)("div",{class:"item__name"},"Port",-1),j={class:"item__value"},w={class:"list__item"},_=(0,o.Wm)("div",{class:"item__name"},"Host",-1),k={class:"item__value"},b={class:"pod__oas"},y=(0,o.Wm)("h4",null,"Specification",-1),W={class:"oas__specification"},O=(0,o.Wm)("div",{class:"dialog__footer"},null,-1);(0,o.Cn)();var S=c((function(e,n,t,i,a,r){var s=(0,o.up)("Divider"),d=(0,o.up)("TreeMenu");return e.dialog?((0,o.wg)(),(0,o.j4)("div",l,[(0,o.Wm)("div",{onClick:n[1]||(n[1]=function(e){return r.outerDialogClick()}),class:"dialog__background"}),(0,o.Wm)("div",u,[(0,o.Wm)("div",p,[(0,o.Wm)("div",f,[(0,o.Wm)("h1",null,(0,o.zw)(t.pod.label),1)]),(0,o.Wm)(s),(0,o.Wm)("div",v,[(0,o.Wm)("div",m,[(0,o.Wm)("div",g,[h,(0,o.Wm)("div",j,(0,o.zw)(t.pod.port),1)]),(0,o.Wm)("div",w,[_,(0,o.Wm)("div",k,(0,o.zw)(t.pod.host),1)])]),(0,o.Wm)("div",b,[y,(0,o.Wm)("div",W,[(0,o.Wm)(d,{data:t.pod.specification},null,8,["data"])])])]),O])])])):(0,o.ry)("",!0)}));function C(e,n,t,i,a,r){var s=(0,o.up)("Tree");return(0,o.wg)(),(0,o.j4)("div",null,[(0,o.Wm)(s,{data:t.data},null,8,["data"])])}var T={class:"direct__name"},x={class:"direct__value"},E={key:0,class:"next__iteration"},P={class:"parentText"};function D(e,n,t,i,a,r){var s=(0,o.up)("OpeningArrow"),d=(0,o.up)("_self");return(0,o.wg)(),(0,o.j4)(o.HY,null,[((0,o.wg)(!0),(0,o.j4)(o.HY,null,(0,o.Ko)(r.directEntries,(function(e,n){return(0,o.wg)(),(0,o.j4)("div",{class:"tree__item",key:n},[(0,o.Wm)("span",T,(0,o.zw)(n),1),(0,o.Wm)("span",x,' - "'+(0,o.zw)(e)+'" ',1)])})),128)),Object.keys(r.compoundEntries).length?((0,o.wg)(),(0,o.j4)("div",E,[((0,o.wg)(!0),(0,o.j4)(o.HY,null,(0,o.Ko)(r.compoundEntries,(function(n,t,i){return(0,o.wg)(),(0,o.j4)("div",{key:i},[(0,o.Wm)("div",{onClick:function(n){return e.open[i]=!e.open[i]},onMouseover:function(n){return e.hover[i]=!0},onMouseleave:function(n){return e.hover[i]=!1},class:"parent"},[(0,o.Wm)(s,{open:e.open[i]},null,8,["open"]),(0,o.Wm)("span",P,(0,o.zw)(t),1)],40,["onClick","onMouseover","onMouseleave"]),e.open[i]?((0,o.wg)(),(0,o.j4)(d,{key:0,data:n},null,8,["data"])):(0,o.ry)("",!0)])})),128))])):(0,o.ry)("",!0)],64)}var I=(0,o.HX)("data-v-1893069c");(0,o.dD)("data-v-1893069c");var H=(0,o.Wm)("rect",{width:"30",height:"20"},null,-1),M=(0,o.Wm)("g",{"clip-path":"url(#clip0)"},[(0,o.Wm)("rect",{width:"30",height:"20"}),(0,o.Wm)("path",{id:"triangle",d:"M15.5328 9.18615C16.1978 9.57384 16.1938 10.5361 15.5255 10.9182L8.0075 15.2169C7.33923 15.599 6.50791 15.1144 6.51113 14.3446L6.54733 5.68447C6.55055 4.91467 7.38588 4.43703 8.05093 4.82472L15.5328 9.18615Z",fill:"#C4C4C4"})],-1),A=(0,o.Wm)("path",{d:"M52.5 10L52.933 13H52.067L52.5 10Z"},null,-1);(0,o.Cn)();var z=I((function(e,n,t,i,a,r){return(0,o.wg)(),(0,o.j4)("svg",{id:"arrow",class:[t.open?"down__pointing":""],width:"30",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg"},[H,M,A],2)})),L={props:{open:Boolean}};L.render=z,L.__scopeId="data-v-1893069c";var N=L,R={name:"tree",components:{OpeningArrow:N},props:{data:Object},data:function(){return{open:[]}},computed:{directEntries:function(){var e=this,n={};return Object.keys(this.data).forEach((function(t){"object"!==(0,s.Z)(e.data[t])&&(n[t]=e.data[t])})),n},compoundEntries:function(){var e=this,n={};return Object.keys(this.data).forEach((function(t){"object"===(0,s.Z)(e.data[t])&&(n[t]=e.data[t])})),n}}};R.render=D;var Y=R,Z={components:{Tree:Y},props:{data:{type:Object,required:!0}}};Z.render=C;var G=Z,B=(0,o.HX)("data-v-97a78d2a");(0,o.dD)("data-v-97a78d2a");var F=(0,o.Wm)("hr",{class:"divider"},null,-1);(0,o.Cn)();var K=B((function(e,n){return(0,o.wg)(),(0,o.j4)("div",null,[F])}));const X={};X.render=K,X.__scopeId="data-v-97a78d2a";var U=X,q={components:{TreeMenu:G,Divider:U},props:{pod:Object,open:Boolean},data:function(){return{dialog:!1}},watch:{open:function(e){this.dialog=e}},methods:{outerDialogClick:function(){this.dialog=!1,this.$emit("closeDialog")}}};q.render=S,q.__scopeId="data-v-0b944f88";var Q=q,V=(t(8309),{class:"accordion__wrapper"}),$={key:0,class:"row__detail"};function J(e,n,t,i,a,r){return(0,o.wg)(),(0,o.j4)("div",V,[((0,o.wg)(!0),(0,o.j4)(o.HY,null,(0,o.Ko)(t.items,(function(n,t){return(0,o.wg)(),(0,o.j4)("div",{key:t},[(0,o.Wm)("div",{class:[e.openedSectionIndex===t?"selected__section":"","accordion__header"],onClick:function(e){return r.toggleSection(t)}},[(0,o.Wm)("span",null,(0,o.zw)(n.name),1),(0,o.Wm)("span",{class:["section__symbol",e.openedSectionIndex===t?"rotate__element":""]}," × ",2)],10,["onClick"]),(0,o.Wm)(o.uT,{name:"slide"},{default:(0,o.w5)((function(){return[e.openedSectionIndex===t?((0,o.wg)(),(0,o.j4)("div",$,(0,o.zw)(n.paths)+" jasn djasnd jasnd asd jasdnaskdj naskdj nasjkdnaskjdn askjdn askjdn askjdn askdnaskdn askdj naskdj asnd aksjd nasdkj asnd kjasdn askjdasndkasjdn askjdansdaskjdasnd asnsajcxnsajkxasxkjnkc ansdaksjdkasnd kjasd nasj dnasd nasd asd asdnasd jnjrekne kwfnkbckjebfsdfjkbewfcwdjkwe ew bwe bwe bwecj wbec ke ef wekj wekjf nwejfn wefn wfk we ",1)):(0,o.ry)("",!0)]})),_:2},1024)])})),128))])}var ee={name:"accordion",props:{items:{type:Array}},data:function(){return{openedSectionIndex:null}},methods:{toggleSection:function(e){e===this.openedSectionIndex?this.openedSectionIndex=null:this.openedSectionIndex=e}}};ee.render=J;var ne=ee,te=t(7200),oe={name:"App",components:{PodDetail:Q,Accordion:ne},data:function(){return{dialog:!1,selectedPod:{},container:null,pods:[],nodes:[],edges:[],options:{clickToUse:!0}}},mounted:function(){var e=this;return(0,d.Z)(regeneratorRuntime.mark((function n(){var t,o,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t=[{NODE_OPENSHIFT_TEST:{port:"8080",host:"172.25.190.25",specification:{openapi:"3.0.3",info:{description:"Testing app for bakalarsky project",version:"1.0.1",title:"Openshift node pod"},paths:{"/":{get:{description:"Greeting from server",responses:{200:{description:"Greeting message."}}}},"/service":{get:{description:"Call another pod in Openshift cluster(like middleware)",responses:{200:{description:"Response from pod."}}}},"/reddit/:subreddit":{get:{description:"Call specific subreddit and return data from it",responses:{200:{description:"Data from subreddit."}}}}}}}},{TEST_VUE_OPENSHIFT:{port:"80",host:"172.25.33.103",specification:{}}},{NODE_3RD_PARTY_APP:{port:"8080",host:"172.25.79.208",specification:{}}},{OSN_ANIMALS:{port:"8080",host:"172.25.151.2",specification:{openapi:"3.0.3",info:{description:"Testing app for bakalarsky project",version:"1.0.1",title:"Openshift node pod"},paths:{"/":{get:{description:"Greeting from server",responses:{200:{description:"Greeting message."}}}},"/animals":{get:{description:"Call another pod in Openshift cluster(like middleware)",responses:{200:{description:"Response from pod."}}}}}}}},{POSTGRESQL:{port:"5432",host:"172.25.191.190",specification:{}}}],e.pods=t,t.forEach((function(e){var n=Object.keys(e)[0];e.label=n,e[n].label=n})),e.nodes=new te.DataSet(t),o={nodes:e.nodes,edges:new te.DataSet(e.edges)},e.container=document.getElementById("graph"),i=new te.Network(e.container,o,e.options),i.on("click",(function(n){if(n.nodes.length>0){var t=e.nodes.get(n.nodes[0]);e.selectedPod=t[Object.keys(t)[0]],e.dialog=!0}else e.selectedPod={},e.dialog=!1}));case 8:case"end":return n.stop()}}),n)})))()},computed:{accordionItems:function(){return this.pods.map((function(e){var n={name:e.label,id:e.id};return Object.keys(e).forEach((function(t){var o,i=e[t];"object"===(0,s.Z)(i)&&(n.paths=i.specification.paths?Object.keys(null===(o=i.specification)||void 0===o?void 0:o.paths).map((function(e){return e})):[])})),n}))}}};oe.render=r;var ie=oe},4238:function(e,n,t){t(7726),t(3473),t(2151),t(1286);var o=t(5393),i=t(1379),a=t(9669),r=t.n(a),s=t(5382),d=t.n(s),c=(t(1539),t(8783),t(3948),t(2119)),l=[{path:"/",name:"Home",component:function(){return Promise.resolve().then(t.bind(t,1379))}}],u=(0,c.p7)({history:(0,c.PO)(),routes:l}),p=u,f=(0,o.ri)(i.default);f.use(d(),r()),f.use(p),f.mount("#app")}},n={};function t(o){var i=n[o];if(void 0!==i)return i.exports;var a=n[o]={exports:{}};return e[o].call(a.exports,a,a.exports,t),a.exports}t.m=e,function(){var e=[];t.O=function(n,o,i,a){if(!o){var r=1/0;for(c=0;c<e.length;c++){o=e[c][0],i=e[c][1],a=e[c][2];for(var s=!0,d=0;d<o.length;d++)(!1&a||r>=a)&&Object.keys(t.O).every((function(e){return t.O[e](o[d])}))?o.splice(d--,1):(s=!1,a<r&&(r=a));s&&(e.splice(c--,1),n=i())}return n}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[o,i,a]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,o){var i,a,r=o[0],s=o[1],d=o[2],c=0;for(i in s)t.o(s,i)&&(t.m[i]=s[i]);for(d&&d(t),n&&n(o);c<r.length;c++)a=r[c],t.o(e,a)&&e[a]&&e[a][0](),e[r[c]]=0;t.O()},o=self["webpackChunkclient"]=self["webpackChunkclient"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(4238)}));o=t.O(o)})();
//# sourceMappingURL=app.8546094f.js.map