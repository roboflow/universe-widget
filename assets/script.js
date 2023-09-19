window.onload = async function() {
  var url = new URL(location.href)

  var publishable_key = url.searchParams.get("key")
  var modelId = url.searchParams.get("model")
  var version = url.searchParams.get("version")

  console.log(publishable_key,modelId,version)

  var model = await roboflow.auth({
    publishable_key
  }).load({
    model: modelId,
    version
  })

  var metadata = model.getMetadata()
  console.log(metadata)

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
  
  copyLink.addEventListener("click",function() {
    navigator.clipboard.writeText(link)
  })


  document.querySelectorAll("[class*=loading]").forEach(e=>{
    e.classList.forEach((value,key,parent)=>{
      if(value.includes("loading")) e.classList.remove(value)
    })
  })
}