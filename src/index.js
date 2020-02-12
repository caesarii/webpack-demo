
import { join } from 'lodash'


function component() {
    let element = document.createElement('div');
  
    // 全局依赖 lodash
    element.innerHTML = join(['Hello', 'webpack'], ' ');

    // 假设我们处于 `window` 上下文
   that.alert('Hmmm, this probably isn\'t a great idea...')
  
    return element;
  }
  
document.body.appendChild(component());