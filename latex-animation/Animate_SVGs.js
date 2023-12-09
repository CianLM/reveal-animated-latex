// Function adapted from:
// https://stackoverflow.com/questions/16863917/check-if-class-exists-somewhere-in-parent
function hasParentorSelfWithMatchingSelector (target, selector) {
    return [...document.querySelectorAll(selector)].some(el => el.contains(target) )
}

equation_divs = document.getElementsByTagName('eq')

for (let i = 0; i < equation_divs.length; i++) {

    Reveal.on( 'ready', event => {
        if(event.currentSlide.contains(equation_divs[i]) && !hasParentorSelfWithMatchingSelector(equation_divs[i],".fragment")) {
            equation_divs[i].innerHTML = convert(
                    equation_divs[i].dataset.latex,
                    equation_divs[i],
                    equation_divs[i].dataset.gradient ? JSON.parse(equation_divs[i].dataset.gradient) : undefined,
                    equation_divs[i].dataset.colorPrecess == "true",
                    equation_divs[i].dataset.speed ? parseFloat(equation_divs[i].dataset.speed) : undefined,
                    equation_divs[i].dataset.delay ? parseFloat(equation_divs[i].dataset.delay) : undefined,
                    equation_divs[i].dataset.precessPeriod ? parseFloat(equation_divs[i].dataset.precessPeriod) : undefined
                )       
        }
    } );

    // console.log(equation_divs[i].innerHTML)
    if (!hasParentorSelfWithMatchingSelector(equation_divs[i],".fragment")) {
        // console.log("Pre-Converted: ", equation_divs[i].innerHTML)
        // console.log(JSON.parse(equation_divs[i].dataset.gradient))
        Reveal.on('slidechanged', event => {
            // console.log(i,event.currentSlide.contains(equation_divs[i]) );
            if (event.currentSlide.contains(equation_divs[i])) {
                equation_divs[i].innerHTML = convert(
                        equation_divs[i].dataset.latex,
                        equation_divs[i],
                        equation_divs[i].dataset.gradient ? JSON.parse(equation_divs[i].dataset.gradient) : undefined,
                        equation_divs[i].dataset.colorPrecess == "true",
                        equation_divs[i].dataset.speed ? parseFloat(equation_divs[i].dataset.speed) : undefined,
                        equation_divs[i].dataset.delay ? parseFloat(equation_divs[i].dataset.delay) : undefined,
                        equation_divs[i].dataset.precessPeriod ? parseFloat(equation_divs[i].dataset.precessPeriod) : undefined
                )        
            }
        });

    } else {
        Reveal.on('fragmentshown', function( event ) {
        console.log("Fragment: ", event.fragment)
            if (event.fragment === equation_divs[i] || event.fragment.contains(equation_divs[i])) {
                // console.log("Converted: ", i)
                equation_divs[i].innerHTML = convert(
                    equation_divs[i].dataset.latex,
                    equation_divs[i],
                    equation_divs[i].dataset.gradient ? JSON.parse(equation_divs[i].dataset.gradient) : undefined,
                    equation_divs[i].dataset.colorPrecess == "true",
                    equation_divs[i].dataset.speed ? parseFloat(equation_divs[i].dataset.speed) : undefined,
                    equation_divs[i].dataset.delay ? parseFloat(equation_divs[i].dataset.delay) : undefined,
                    equation_divs[i].dataset.precessPeriod ? parseFloat(equation_divs[i].dataset.precessPeriod) : undefined
                )       
            }
    
        // console.log(event.fragment)
        } );
    }

}


function convert(str, div, gradient = [], colour_precess = false, inc = 0.2, delay = 0, colour_precess_period = 5) {
    // console.log(delay)
    //
    //  Get the TeX input
    //
    var input = new DOMParser().parseFromString(str.trim(), "text/html").documentElement.textContent
    
    //  Reset the tex labels (and automatic equation numbers, though there aren't any here).
    //  Get the conversion options (metrics and display settings)
    //  Convert the input to SVG output and use a promise to wait for it to be ready
    //    (in case an extension needs to be loaded dynamically).
    //
    // MathJax.texReset();
    var options = MathJax.getMetricsFor(div);
    options.display = true;
    MathJax.tex2svgPromise(input, options).then(function (node) {
    //
    //  The promise returns the typeset node, which we add to the output
    //  Then update the document to include the adjusted CSS for the
    //    content of the new equation.
    //
    //   console.log(node.innerHTML)
    //   div.replaceChildren(node)
    div.innerHTML = DrawSVG(MJP(node.innerHTML), gradient, colour_precess, inc, delay, colour_precess_period)
    //   MathJax.startup.document.clear();
    //   MathJax.startup.document.updateDocument();
    }).catch(function (err) {
        //
        //  If there was an error, put the message into the output instead
        //
        div.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
    })
}
