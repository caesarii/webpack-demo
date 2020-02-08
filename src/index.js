// import printMe from './print.js'

function getComponent() {
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
      var element = document.createElement('div');

        element.innerHTML = _.join(['Hello', 'webpack'], ' ');


        // printMe()
        return element;

    }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
   document.body.appendChild(component);
})
  