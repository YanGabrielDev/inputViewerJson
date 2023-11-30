const inputJsonFile = document.getElementById('json_uploader')
const jsonContainer = document.getElementById('json_container')


async function handleChangeInputFile(event){
        const file = event.target.files[0]

        const transformStream = new TransformStream({
            async transform(chunk, controller){

             const lines = chunk.split('\n');
             lines.forEach(line => {
                 controller.enqueue(new TextEncoder().encode(line))
             })
            }
         })

         const writableStream = new WritableStream({
            async write(chunk){
                console.log('Data written:', new TextDecoder().decode(chunk));
                renderElement(new TextDecoder().decode(chunk))
                await new Promise(resolve => setTimeout(resolve, 200));

            }
        })
        await file
        .stream().pipeThrough(new TextDecoderStream())
        .pipeThrough(transformStream)
        .pipeTo(writableStream)
        // console.log(opa);
}

function renderElement(chunk){
    jsonContainer.innerHTML += `<p>${chunk}</p> `
}

function checkFile (json){
    console.log(json);
}
inputJsonFile.addEventListener('change', (event) => handleChangeInputFile(event))