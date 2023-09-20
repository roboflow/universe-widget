async function loadWidget() {
  var url = new URL(location.href)

  var publishable_key = url.searchParams.get("key")
  var modelId = url.searchParams.get("model")
  var version = url.searchParams.get("version")

  if(!publishable_key||!modelId||!version) throw Error("One of the following required URL parameters are missing: key, model, version")

  console.log(publishable_key,modelId,version)

  // make a request to https://api.roboflow.com/tfjs/people-detection-o4rdr/7?publishable_key=rf_b0LW0UD0XvYuZKndeVpUrGoct322&host=stellasphere.github.io&u=22a2s-2btyisboaq1&v=0.2.26
  fetch(`https://api.roboflow.com/tfjs/${modelId}/${version}?publishable_key=${publishable_key}&host=${location.host}&u=${navigator.userAgent}&v=0.2.26`)
  .then(response => response.json())
  .then(data => {
    var metadata = data.tfjs;
    title.innerText = metadata.name
    image.style.backgroundImage = `
  url("https://source.roboflow.com/${metadata.icon}/annotation-people.png"), url("https://source.roboflow.com/${metadata.icon}/thumb.jpg")
    `
    document.querySelector(`.tag-${metadata.type}`).style.display = "flex"
    annotation.innerText = metadata.annotation
    classesCount.innerText = `${metadata.classes.length} ${metadata.classes.length>1?"classes":"class"}`

    link = `https://universe.roboflow.com/leo-ueno/people-detection-o4rdr`

    tryLink.href = link
    image.href = link
    


    document.querySelectorAll("[class*=loading]").forEach(e=>{
      e.classList.forEach((value,key,parent)=>{
        if(value.includes("loading")) e.classList.remove(value)
      })
    })
  })
}

function showError() {
  error.style.display = "flex"
}

window.onload = function() {
  loadWidget().catch(e => {
    console.error(e)

    showError()
  })
}