<p align="center">
  <a href="https://revealjs.com">
  <img src="https://hakim-static.s3.amazonaws.com/reveal-js/logo/v1/reveal-black-text-sticker.png" alt="reveal.js" width="500">
  </a>
  <br><h1>Reveal.js with Animated LaTeX</h1><br>
</p>

## Setup

Assuming you have reveal.js setup, clone this repository and place the `latex-animation` directory at the root of the project.

Then place the following scripts **after** reveal has initialized (`Reveal.initialize()`) in your HTML file
```js
<link rel="stylesheet" href="latex-animation/animate_latex.css" />
<script src="https://cdn.jsdelivr.net/npm/svg-path-properties@1.3.0/dist/svg-path-properties.min.js"></script>
<script src="latex-animation/SVGProcessing.js"></script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
<script src="latex-animation/Animate_SVGs.js"></script>
```

**Note**. Do not import MathJax before these scripts as it will process your equations before they can be animated. 

## Usage

To add animated LaTeX, use the `<eq>` tag and place LaTeX inside it. For example,
```HTML
  <eq>
    \mathcal{L}=F_{\mu\nu}F^{\mu\nu}+\gamma\sqrt{(F_{\mu \nu}F^{\mu \nu})^2+(F_{\mu\nu}\tilde{F}^{\mu\nu})^2}
  </eq>
```
<!-- [Standard Animation](https://github.com/CianLM/reveal-animated-latex/assets/67507781/8f5634a2-5b8d-45ad-9a60-411369e472e2.mp4) -->

https://github.com/CianLM/reveal-animated-latex/assets/67507781/f14af133-958b-436e-97a0-9eb38feebb8a


or for more advanced usage (and using fragments),
```HTML
  <eq class="fragment" data-gradient='["red", "gold"]' data-color-precess="true">
    \mathcal{L}=F_{\mu\nu}F^{\mu\nu}+\gamma\sqrt{(F_{\mu \nu}F^{\mu \nu})^2+(F_{\mu\nu}\tilde{F}^{\mu\nu})^2}
  </eq>
```
<!-- [Red to Gold Gradient](https://github.com/CianLM/reveal-animated-latex/assets/67507781/5341c369-f355-4b36-a0ec-964c1618cc9f.mp4) -->


https://github.com/CianLM/reveal-animated-latex/assets/67507781/7fda5e2e-8297-4b31-92e8-6f764e0a2124


`align` environments are also supported. For example,
```HTML
<eq>
  \begin{align*}
      \nabla \cdot \mathbf{E} &= 0 \\
      \nabla \cdot \mathbf{B} &= 0
  \end{align*}
</eq>
```


## Options
If you want to customize the animation, there are a number of parameters in the form of `data-` attributes.

### Animation Speed (data-speed)
The increment of time (in seconds) between each stroke.
```HTML
<eq data-speed="0.3">
  ...
</eq>
```

### Color/Color Gradient (data-gradient)

Any number of colors $n \geq 1$ is accepted (as well as rgb/hex values).
```HTML
<eq data-gradient='["red", "gold"]'>
  ...
</eq>
```
<!-- [Red to Gold Gradient](https://github.com/CianLM/reveal-animated-latex/assets/67507781/5341c369-f355-4b36-a0ec-964c1618cc9f.mp4) -->


https://github.com/CianLM/reveal-animated-latex/assets/67507781/7fda5e2e-8297-4b31-92e8-6f764e0a2124


### Color Precession (Experimental)
The gradient precesses in a loop.
```HTML
<eq data-gradient='["red", "gold"]' data-color-precess="true">
  ...
</eq>
```
<!-- [Colour Precession](https://github.com/CianLM/reveal-animated-latex/assets/67507781/274938c1-8ab2-49ad-a346-c5feb64d0bf8.mp4) -->


https://github.com/CianLM/reveal-animated-latex/assets/67507781/f76f6509-2c8d-422b-b83a-fc86ca48d15d



### Animation Delay
Add a delay (in seconds) to the start of the animation.
```HTML
<eq data-delay='1'>
  ...
</eq>
```
