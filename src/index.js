
function component() {
    let element = document.createElement('div');
  
    // 全局依赖 lodash
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
  }
  
  document.body.appendChild(component());