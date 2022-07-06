

const quotesbox = document.getElementById("quotes");
const loader = document.getElementById("loader");

// control variables
let currentPage = 1;
const limit = 10;
let total = 0;

async function getQuotes(page,limit){
    try {
        const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
        let apiData = await fetch(API_URL);
        return await apiData.json()
        
    } catch (error) {
         throw new Error(`An error occurred: ${error}`);
        
    }   
}

const showQuotes = (Quotes)=>{
    Quotes.forEach(Quote => {
        const QuoteEl= document.createElement("blockquote");
        QuoteEl.classList.add("quote");

        QuoteEl.innerHTML=`
        <span>${Quote.id})</span>
        ${Quote.quote}
        <footer>${Quote.author}</footer>
        `
        quotesbox.appendChild(QuoteEl);
    });


}
const showLoader=()=>{
 loader.classList.add("show");
}
const hideLoader=()=>{
    loader.classList.remove("show");
}


const loadQuotes = async (page,limit)=>{
    showLoader();
    try {
        if(hasMoreQuotes(page,limit,total)){
            const res = await getQuotes( page,limit);
            let data = res.data;
            showQuotes(data);
            total=res.total
        }
        
    } catch (error) {
        console.log(`An error occurred: ${error}`)
        
    }finally{
        hideLoader()
    }   
}

const hasMoreQuotes=(Page,limit,total)=>{
    const startIndex=(Page-1)*(limit+1);
    return total===0||startIndex<=total;

}

window.addEventListener('scroll',()=>{
    let clientHeight=document.documentElement.clientHeight;
    let scrollHeight=document.documentElement.scrollHeight;
    let scrollTop=document.documentElement.scrollTop;



    if(clientHeight+scrollTop>=scrollHeight-5 &&
        hasMoreQuotes(currentPage,limit,total)){
            currentPage++;
            loadQuotes(currentPage,limit);

    }
    
})


loadQuotes(currentPage,limit);
