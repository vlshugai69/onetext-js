(() => {
    // First script
    
    const extractUTMParams = () => {
        const params = new URLSearchParams(window.location.search);
        const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'];
        const utmData = {};

        utmParams.forEach(param => {
            const value = params.get(param);
            if (value) {
                utmData[param] = value;
            }
        });

       return utmData;
    }

    const getDemoSourceString = () => {
          const headerExperiment = window.abTestHeroHeaderLabel || "siteControl";
          
          return encodeURIComponent(`${headerExperiment}|${JSON.stringify(extractUTMParams())}`);
    };

    const url = document.querySelector("#url");
    const urlAdv = document.querySelector("#advUrl");
    var myHeaders = new Headers();
    const username = 'onetext_client_production_be5e90b5-b6fa-4d65-ad13-281ef02a305f';
            const password = '';
    const base64Credentials = btoa(`${username}:${password}`);
    myHeaders.append("Authorization", `Basic ${base64Credentials}`);
    myHeaders.append("Content-Type", "application/json");

    const qrCode = new QRCodeStyling({
        width: 190,
        height: 190,
        type: "svg",
        data: "https://www.facebook.com/",
        dotsOptions: {
            gradient: {
                type:"linear",
                rotation:3.14/2,
                colorStops: [{ offset: 0.6, color: '#3E94FD' }, {  offset: 0.6, color: '#F9F6EB' }]
            },
            type: "rounded"
        },
        backgroundOptions: {
            color: "transparent",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin:80
        },
        cornersSquareOptions:{
            type:"extra-rounded",
            color:"#3E94FD",
        },
        cornersDotOptions:{
            type:""
        }
    });

    const input = document.querySelector("#phoneNumber");
    const button = document.querySelector("#phone-submit");
    const errorMsg = document.querySelector("#error-msg");
    const phoneNumberForm = document.querySelector('#phone-form');

    const iti = window.intlTelInput(input, {
        onlyCountries: ["us"],
    allowDropdown:false,
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
    });

    const reset = () => {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("hide");
    };
    const submitPhoneNumber = ()=>{
    reset();
    if(input.value===''){
        console.log('empty')
        input.classList.add("error");
        
        errorMsg.innerHTML = 'This field is required';
        errorMsg.classList.remove("hide");
    }else{
    if (input.value.trim()) {
        if (iti.isValidNumber()) {
            let raw = JSON.stringify({
    "externalID":  "demobot_v7_with_ai",
    "allowManualStart": true,
    "allowMultipleStarts": true,
    "followQuietHours": false,
    "followMandatoryQueitHours":  false,
    "marketingConsentGranted": true,
    "receivers": {
        "type": "contacts",
        "contacts": [
            { "phoneNumber" : input.value }
        ]
    },
    "parameters": {
        "url": url.value?url.value:urlAdv.value,
        "source": getDemoSourceString()
    }
    });
    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://onetext.com/api/flow/custom/start", requestOptions)
    .then(response => response.text())
    .then(result => {
        phoneForm.style.display = "none";
        phoneSuccess.style.display = "block";
        })
    .catch(error => {
        console.log('error', error)
        phoneForm.style.display = "none";
        phoneError.style.display = "block";
        });
    }else {
        input.classList.add("error");
        const errorCode = iti.getValidationError();
        errorMsg.innerHTML = errorCode && errorCode in errorMap && errorMap[errorCode] ? errorMap[errorCode] : 'Hmm we had an error submitting your number, please try again';
        errorMsg.classList.remove("hide");
        }
        } 
    }
    }


    phoneNumberForm.addEventListener('keydown',(e) =>{ 
    if (e.code === 'Enter' || e.keyCode === 13) {
                e.preventDefault();
        submitPhoneNumber();
    }})

    const errorMap = ["Make sure that the phone number is entered correctly.E.g.: +1 (000) 000-0000", "Invalid country code", "Too short", "Too long", "Invalid number"];

    button.addEventListener('click', submitPhoneNumber);
    input.addEventListener('change', reset);

    // Second script

    window.addEventListener("DOMContentLoaded", (event) => {
        let typeSplit = new SplitType(".splited-text", {
            types: "words, chars",
            tagName: "span"
        });
        let timeline_1 = gsap.timeline();
        setTimeout(function() {
            timeline_1.to("#white-bevelled-box", {
                scrollTrigger: {
                    trigger: '#white-bevelled-box',
                    start: 'bottom 0%',
                    end: "+=90%",
                    scrub: 0.3,
                },
                scale: 1.3,
            });
            timeline_1.from(".is--animated_text .char", {
                scrollTrigger: {
                    trigger: '#white-bevelled-box',
                    start: 'top 0%',
                    end: "+=80%",
                    scrub: 1.5,
                },
                opacity: 0.01,
                scale: 1.35,
                ease: "back.out(2)",
                stagger: {
                    amount: 10,
                    from: "start"
                },
            });
        }, 500);
    });
    
    const urlInput = document.querySelector("#url");
    const textDemo = document.querySelector("#text-demo");
    const usaPopup = document.querySelector(".usa");
    const otherWorldPopup = document.querySelector(".non-usa");
    const advInput = document.getElementById('advUrl');
    
    qrCode.append(document.getElementById("canvas"));
    const qrContainer = document.querySelector('#qr-container');
    qrCode.append(qrContainer);
    
    function updateSizeQr() {
        if (window.innerWidth < 1400) {
            qrCode.update({
                width: 140,
                height: 140
            })
        } else {
            qrCode.update({
                width: 190,
                height: 190
            })
        }
    }
    updateSizeQr();
    
    const qrLine = document.getElementById('qr-line');
    
    function animateQRLineWidth(from, to, duration) {
        const startTime = performance.now();
    
        function update() {
            const currentTime = performance.now();
            const progress = (currentTime - startTime) / duration;
            const clampedProgress = Math.min(1, progress);
            const newWidth = from + clampedProgress * (to - from);
            qrLine.style.setProperty('width', `${newWidth}%`);
            if (clampedProgress < 1) {
                requestAnimationFrame(update);
            }
        }
        update();
    }
    
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    
    function animateColorStopsOffset(from, to, duration) {
        const startTime = performance.now();
        qrLine.style.setProperty('width', '90%');
    
        function update() {
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;
            const clampedProgress = easeInOutQuad(Math.min(1, elapsed / duration));
            qrCode._options.dotsOptions.gradient.colorStops[0].offset = from + clampedProgress * (to - from);
            qrCode._options.dotsOptions.gradient.colorStops[1].offset = from + clampedProgress * (to - from);
            const newPosition = (from + (clampedProgress * 86) * (to - from)) + 4;
            qrLine.style.setProperty('top', `${newPosition}%`);
            qrCode.update();
            if (clampedProgress < 1) {
                requestAnimationFrame(update);
            } else {
                animateQRLineWidth(100, 0, 200);
            }
        }
        update();
    }
    
    var $form = $("#email-form");
    $form.submit(function(e) {
        e.preventDefault();
        return false;
    });
    
    $.validator.addMethod('validUrl', function(value, element) {
        var url = $.validator.methods.url.bind(this);
        return url(value, element) || url('http://' + value, element);
    }, 'Please enter a valid URL');
    
    $form.validate({
        rules: {
            url: {
                validUrl: true,
                url: false,
                required: true
            }
        },
        errorLabelContainer: '.error-block-url',
    })
    const getData = () => {
        let raw = JSON.stringify({
            "externalID": "demobot_v7_with_ai",
            "allowManualStart": true,
            "allowMultipleStarts": true,
            "followQuietHours": false,
            "followMandatoryQueitHours": false,
            "receivers": {
                "type": "contacts",
                "contacts": [{
                    "phoneNumber": "+19167929482"
                }]
            },
            "parameters": {
                "url": urlInput.value ? urlInput.value : advInput.value,
                "source": getDemoSourceString()
            }
        });
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        return requestOptions;
    }
    const popupBrand = document.querySelectorAll('.pop-up-brand')
    let requestBrandOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    const textDemoHandler = (e, form) => {
        e.preventDefault();
        console.log(form.valid())
        if (form.valid()) {
    
            fetch("https://ipapi.co/json")
                .then(res => res.json())
                .then(data => {
                    if (data.country_code.includes('US')) {
                        usaPopup.style.display = "flex";
                        usaPopup.style.opacity = "100%";
    
                    } else {
                        otherWorldPopup.style.display = "flex";
                        otherWorldPopup.style.opacity = "100%";
                    }
                    qrCode.update({
                        data: `https://onetext.com/link/d288791fb045?merchantUrl=${urlInput.value?urlInput.value:advInput.value}&source=${getDemoSourceString()}`
                    });
                    animateColorStopsOffset(0, 1, 2000);
    
    
                    fetch(`https://onetext.com/api/demo/brand?url="${urlInput.value?urlInput.value:advInput.value}"`, requestBrandOptions)
                        .then(response => response.json())
                        .then(result => {
                            popupBrand.forEach((brand) => {
                                brand.textContent = result.brandName
                            })
                        })
                        .catch(error => console.log('error', error));
                    fetch("https://onetext.com/api/flow/custom/start", getData())
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                })
        }
    }

    let isUS = true;

    fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => {
            if (data.country_code) {
                isUS = data.country_code.includes('US');
            }
        });
    
    const textDemoHandlerMob = (e, form) => {
        e.preventDefault();
        let requestBrandOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        if (form.valid()) {
            if (isUS) {
                window.location = `https://onetext.com/link/d288791fb045?merchantUrl=${urlInput.value?urlInput.value:advInput.value}&source=${getDemoSourceString()}`;
            } else {
                otherWorldPopup.style.display = "flex";
                otherWorldPopup.style.opacity = "100%";
            }
        }
    }
    var $formAdv = $("#adv-form");
    const advTextDemo = document.getElementById('adv-text-demo')
    $formAdv.validate({
        rules: {
            advUrl: {
                validUrl: true,
                url: false,
                required: true
            }
        },
        errorLabelContainer: '.error-block--adv'
    })
    const mediaQuery = window.matchMedia("(max-width: 992px)");
    const handleTextDemoEvent = (event, formHandler) => {
        event.preventDefault();
        if (mediaQuery.matches) {
            textDemoHandlerMob(event, formHandler);
        } else {
            textDemoHandler(event, formHandler);
        }
    };
    const textDemoClickHandler = (e) => {
        handleTextDemoEvent(e, $form);
    };
    const advTextHandler = (e) => {
        handleTextDemoEvent(e, $formAdv);
    };
    const formKeyDownHandler = (e) => {
        if (e.code === 'Enter' || e.keyCode === 13) {
            handleTextDemoEvent(e, $form);
        }
    };
    const advKeyDownHandler = (e) => {
        if (e.code === 'Enter' || e.keyCode === 13) {
            handleTextDemoEvent(e, $formAdv);
        }
    };
    const updateEventListeners = () => {
        textDemo.removeEventListener('click', textDemoClickHandler);
        textDemo.addEventListener('click', textDemoClickHandler);
        advTextDemo.removeEventListener('click', advTextHandler);
        advTextDemo.addEventListener('click', advTextHandler);
        $form.off('keydown', formKeyDownHandler);
        $form.on('keydown', formKeyDownHandler);
        $formAdv.off('keydown', advKeyDownHandler);
        $formAdv.on('keydown', advKeyDownHandler);
    };
    updateEventListeners();
    window.addEventListener('resize', updateEventListeners);
    window.addEventListener('resize', updateSizeQr);
    const phoneForm = document.getElementById('phone-form')
    const phoneNumber = document.getElementById('phoneNumber');
    const phoneSuccess = document.getElementById('phone-success')
    const phoneError = document.getElementById('phone-error')
    const phoneSubmit = document.getElementById("phone-submit");
})();

const advTextDemoUrl = document.getElementById("adv-text-demo-url");
const advTextDemoUrlPopup = document.querySelector('.pop-up-adv__inner.pop-up-url');
const advTextDemoEmailPopup = document.querySelector('.pop-up-adv__inner.pop-up-email');
console.log(123);
const advTextDemoUrlHandler = (e) => {
    console.log('click')
    advTextDemoUrlPopup.classList.remove('show');
    advTextDemoEmailPopup.classList.add('show');
};
advTextDemoUrl.addEventListener('click', advTextDemoUrlHandler);
