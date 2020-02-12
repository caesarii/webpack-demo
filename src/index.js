
import { log } from './globals'

log('global log')

function component() {
    let element = document.createElement('div');
  
    // 全局依赖 lodash
    element.innerHTML = join(['Hello', 'webpack'], ' ');

    // 假设我们处于 `window` 上下文
  //  this.alert('Hmmm, this probably isn\'t a great idea...')
  
    return element;
  }
  
document.body.appendChild(component());