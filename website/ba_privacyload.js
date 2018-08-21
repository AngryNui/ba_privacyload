var privacyJSON = [
    {
        name: "Disqus",
        privacyLink: "https://help.disqus.com/terms-and-policies/disqus-privacy-policy",
        divId:"disqus_thread",
        addScript: [
            "(function () {"+
                "var d = document, s = d.createElement('script');"+
                "s.src = 'https://privacyload.disqus.com/embed.js';"+
                "s.setAttribute('data-timestamp', +new Date());"+
                "(d.head || d.body).appendChild(s);"+
            "})();"
        ]
    },
    {   name:"GoogleMaps",
        privacyLink: "https://privacy.google.com/your-data.html",
        divId:"map",
        addScript: [
            "function initMap() {"+
                "var myLatLng = {lat: 51.0627275, lng: 13.75128410000002};"+
                "var map = new google.maps.Map(document.getElementById('map'), {"+
                    "center: myLatLng,"+
                    "zoom: 15"+
                "});"+
                "var marker = new google.maps.Marker({"+
                    "map: map,"+
                    "position: myLatLng,"+
                    "title: 'Fettboy'"+
                "});"+
            "}"
        ],
        addSrc:"https://maps.googleapis.com/maps/api/js?key=AIzaSyCgyHbgSoDrBoZIrt_IFGpmrDwDa-7naoc&callback=initMap"
    }
];

document.addEventListener('DOMContentLoaded', function(){
    initPrivacyLoad();
});

function loadScript(obj){
    for (var i in obj) {
        if(i === "addScript"){
            var addScript=obj.addScript;
            addScript.join('\n');
            var newScript = document.createElement("script");
            var inlineScript = document.createTextNode(addScript);
            newScript.appendChild(inlineScript);
            document.head.appendChild(newScript);
        } else if (i === "addSrc"){
            var newSrc = document.createElement("script");
            newSrc.src = obj.addSrc;
            document.head.appendChild(newSrc);
        }
    }
}

function initPrivacyLoad() {
    var privacyWelcome = document.createElement("div");
    var nayButton = document.createElement("button");
    var yayButton = document.createElement("button");
    var buttonWrapper = document.createElement('div');
    var privacySettings = document.createElement('div');
    privacySettings.className = 'privacySettings';
    privacySettings.innerText = "Scripte nachladen";
    privacySettings.onclick = function(){toggleWelcome()};
    document.body.style.overflow = 'hidden';
    privacyWelcome.id = 'privacyWelcome';
    privacyWelcome.innerHTML += '<div id="privacyWrapper"><h1>Privacyload</h1><p>Hallo, welche datenschutzrelevante Scripte möchtest du laden?</p></div>';
    document.body.appendChild(privacyWelcome);
    var privacyWrapper = document.getElementById('privacyWrapper');
    for( var i = 0; i < privacyJSON.length; i++) {
            var scriptItem = document.createElement("div");
            var scriptItemInnerHTML = ''
            scriptItem.className = "scriptItem flexDiv";
            if (privacyJSON[i].privacyLink!=undefined){
                scriptItemInnerHTML = '<span>'+privacyJSON[i].name+'<br><a href="'+privacyJSON[i].privacyLink+'" target="_blank">Datenschtutzerklärung &#8594;</a></span><input type=checkbox id=toggly'+i+'><label for=toggly'+i+'><i></i></label>';
            } else {
                scriptItemInnerHTML = '<span>'+privacyJSON[i].name+'<br> </span><input type=checkbox id=toggly'+i+'><label for=toggly'+i+'><i></i></label>';
            }

            scriptItem.innerHTML += scriptItemInnerHTML;
            privacyWrapper.appendChild(scriptItem);
    }
    buttonWrapper.className = "buttonWrapper flexDiv"
    nayButton.id = 'nay';
    yayButton.id = 'yay';
    nayButton.innerText = 'nay';
    yayButton.innerText = 'yay';
    yayButton.onclick = function(){close()}
    yayButton.onclick = function(){close()};
    nayButton.onclick = function(){toggleWelcome()};
    buttonWrapper.appendChild(nayButton);
    buttonWrapper.appendChild(yayButton);
    privacyWrapper.appendChild(buttonWrapper);
    document.body.appendChild(privacySettings);
}
function toggleWelcome(){
    document.getElementsByTagName("body")[0].style = '';
    privacyWelcome.classList.toggle("hide");
}
function close(){
    for(var i = 0; i < privacyJSON.length; i++) {
        if (document.getElementsByClassName('scriptItem')[i].children[1].checked){
            loadScript(privacyJSON[i]);
        } else {
            if (privacyJSON[i].divId && document.querySelector("#"+privacyJSON[i].divId+" .privacyPlaceholder")){
                console.log("hi",i,privacyJSON[i].divId,document.querySelector("#"+privacyJSON[i].divId+" .privacyPlaceholder"));
                document.querySelector("#"+privacyJSON[i].divId+" .privacyPlaceholder").addEventListener('click', function(){
                    var privacyPlaceholder = this;
                    privacyJSON.forEach(function(value, index){
                        if (privacyPlaceholder.parentElement.id == value.divId) {
                            loadScript(privacyJSON[index]);
                        }
                    });
                });
            }
        }
    }
    toggleWelcome();
}


