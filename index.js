'use strict';

class castomJQuery {
    
    constructor(selector) {
        if (typeof selector === 'string' && selector.length !== 0) {
            this.value = Array.from(document.querySelectorAll(selector));
        }
        
        else {
            this.value = document;
        }
    }
                
    addClass(className) {
        if (typeof className === 'string') {
            
            let classes = className.split(' ');
            
            for (let i = 0; i < classes.length; ++i) {
                
                this.value.forEach(elem => {
                    
                    elem.classList.add(classes[i]); 
                
                });
            }
        }
        
        else if (typeof className === 'function') {
            for (let i = 0; i < this.value.length; ++i) {
                
                let funcResult = className.call(this.value[i], i, this.value[i].className);
                
                if (!funcResult) {
                    continue;
                }

                let classes = funcResult.split(' ');
                classes.map(item => this.value[i].classList.add(item));
            }
        }
        return this;
    }

    append(element) {
        if (typeof element === 'string') {
            this.value.forEach(elem => {
                elem.innerHTML += element;
            });
        }
            
        if (element.nodeType) {      
            this.value.forEach(elem => {
            let cloneElement = element.cloneNode(true)
                elem.appendChild(cloneElement);
            });
        }
        return this;
    }

    html(htmlString) {
        if (!htmlString) {
            return this.value[0].innerHTML;
        }
        else if (typeof htmlString === 'string') {
            this.value.forEach(elem => {
                elem.innerHTML = htmlString; 
            });
        }

        else if (typeof htmlString === 'function') {
            for (let i = 0; i < this.value.length; ++i) {
                let item = htmlString(i, this.value[i].innerText);
                this.value[i].innerHTML = item;
            }
        }
        return this;
    }
        

    attr(attributeName, value) {
        if (!value && attributeName) {
            return this.value[0].getAttribute(attributeName);
        }

        else if (value && attributeName) {
            this.value.forEach(elem => {
                elem.setAttribute(attributeName, value); 
            });
        }
    }

    children(selector) {
        if (!selector) {
            return this.value[0].children;
        }

        else {
            let result = [];
            for (let i = 0; i < this.value[0].children.length; i++) {
                
                if (this.value[0].children[i].matches(selector)) {
                    result.push(this.value[0].children[i]);
                }
            }
            return result;
        }
    }

    css(propertyName) {
        if (typeof propertyName === 'string') {
            return this.value[0].style[propertyName]
        }
        else if (typeof propertyName === 'object') {
            this.value.forEach(elem => {
                for (let typeOfStyle in propertyName) {
                    elem.style[typeOfStyle] = propertyName[typeOfStyle]; 
                }
            });
        }
        return this;
    }
        
    data(key, value) {
        if (typeof key === 'string' && value) {
            this.value.forEach(elem => {
                elem.dataset[key] = value; 
            });
        }
            
        else if (typeof key === 'string' && !value) {
            return this.value[0].dataset[key] || undefined;
        }

        else if (typeof key === 'object' && !value) {               
            this.value.forEach(elem => {
                for (let keyName in key) {
                    elem.dataset[keyName] = key[keyName]; 
                }
            });   
        }

        else if (!key && !value) {     
            return this.value[0].dataset;
        }
    }

    on(events, selector, handler) {
           
        if (typeof selector === 'function' && !handler) {
            handler = selector;
            selector = null;       
            this.value.forEach(elem => {
                elem.addEventListener(events, handler)
            });
        }

        else {
            this.value.forEach(function(elem) {
                elem.addEventListener(events, e => {
                    if (e.target.matches(selector)) {
                        return handler();                   
                    };
                })
            });
        }
    } 

    one(events, handler) {
        this.value.forEach(elem => {
            elem.addEventListener(events, function eventFunc(){
                elem.removeEventListener(events, eventFunc);
                return handler();
            })
        });
    }

    each(func) {
        for (let i = 0; i < this.value.length; i++) {
            let result = func.call(this.value[i], i, this.value[i]);
            if (result === false) {break;}
        }
        return this;
    }
}
    
window.$ = function (selector) {
    return new castomJQuery(selector);
}