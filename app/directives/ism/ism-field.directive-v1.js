(function() {
  'use strict';

  angular.module('jtAngularPlayground.ISM').directive('ismField', IsmField);
  function IsmField ($log) {
    return {
      restrict: 'A',
      require: ['^form','ngModel'],
      scope: {},
      link: function (scope, element, attrs, ctrls) {
        var EMAIL_PATTERN = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
        var URL_PATTERN = 'http?://.+';
        var NAME_PATTERN = '^[a-zA-Z](\s?[a-zA-Z]){1,30}$';
        var NUMBER_PATTERN = '/\[0-9]/g';

        function setAttribute(name, value, forceSet) {
          if(!attrs.hasOwnProperty(name) || forceSet) {
            (value)?attrs.$set(name, value):attrs.$set(name, true);
          }
        }

        function constructErrorPlaceHolder() {
          var elem = angular.element('<div>');
          elem.attr('id', 'notify'+attrs.id);
          elem.css('display', 'none')
          ctrls[0].$$element.append(elem);
        }

        function addEventListeners() {
          element.on('invalid', (function(scope, element, attrs, ctrls) {
            return validateInput;
          })(scope, element, attrs, ctrls));

          element.on('blur', (function(scope, element, attrs, ctrls) {
            return validateInput;
          })(scope, element, attrs, ctrls));

          element.on('input', (function(scope, element, attrs, ctrls) {
            return resetDecorations;
          })(scope, element, attrs, ctrls));
        }

        function validateInput(event) {
          event.preventDefault();
          if ( ctrls[1].$invalid || !angular.equals(ctrls[1].$error, {})) {
            console.log(scope);
            console.log(element);
            console.log(attrs);
            console.log(ctrls[1].$error);
            event.target.className = 'invalid shake';
            showError(event.target);
          }
        }

        function showError(elem, errorMessage) {
          var errorElem = ctrls[0].$$element[0].querySelector('div #notify'+attrs.id);
          errorElem.textContent   = (elem.placeholder) ? elem.placeholder + ': ' + elem.validationMessage : elem.validationMessage;
          errorElem.className     = 'error';
          errorElem.style.display = 'block';
        }

        function resetDecorations(event) {
          var errorElem = ctrls[0].$$element[0].querySelector('div #notify'+attrs.id);
          if ( 'block' === errorElem.style.display ) {
            event.target.className = '';
            errorElem.style.display = 'none';
          }
        }

        function processTextInput() {
        }

        function processNumberInput() {
          if(!attrs.pattern) {
            setAttribute('pattern', NUMBER_PATTERN);
          }
        }

        function processEmailInput() {
          if(!attrs.pattern) {
            setAttribute('pattern', EMAIL_PATTERN);
          }
        }

        function processURLInput() {
          if(!attrs.pattern) {
            setAttribute('pattern', URL_PATTERN);
          }
        }

        function processSubmitInput() {
          if(!attrs.pattern) {
            setAttribute('novalidate');
          }
        }

        function processDefaultInput() {
        }

        function processAttributes() {
          //set 'id' attribute, if not present
          setAttribute('id', Date.now()+Math.ceil(Math.random()*1000));

          //construct the error placeholder for all input elements
          constructErrorPlaceHolder();

          //add event listeners
          addEventListeners();

          switch(attrs.type) {
            case 'text':
            processTextInput();
            break;

            case 'number':
            processNumberInput();
            break;

            case 'email':
            processEmailInput();
            break;

            case 'url':
            processURLInput();
            break;

            case 'submit':
            processSubmitInput();
            break;

            default:
            processDefaultInput();
            break;
          }
        }

        processAttributes();
      }
    }
  }

  IsmField.$inject = ['$log'];
}());