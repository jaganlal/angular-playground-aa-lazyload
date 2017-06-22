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

        function showError(elem, errorMessage) {
          var errorElem = ctrls[0].$$element[0].querySelector('div #notify'+attrs.id);
          var messageToShow = (errorMessage)?errorMessage+elem[0].validationMessage:elem[0].validationMessage;
          var placeholder = elem.attr('placeholder');

          elem.addClass('invalid shake');
          errorElem.textContent   = (placeholder) ? placeholder + ': ' + messageToShow : messageToShow;
          errorElem.className     = 'error';
          errorElem.style.display = 'block';

        }

        function resetError(elem) {
          var errorElem = ctrls[0].$$element[0].querySelector('div #notify'+attrs.id);
          if ( 'block' === errorElem.style.display ) {
            elem.removeClass('invalid shake');
            errorElem.style.display = 'none';
          }
        }

        function processModelErrorObject(newVal) {
          if(newVal === undefined) { //intermediate state
            showError(element);
          } else if(!angular.equals(newVal, {})) {
            var errorMessage = '';
            var temp = '';
            if(attrs.name && attrs.name.length) {
              var keylist = Object.keys(newVal);
              for(var i=0; i<keylist.length; ++i) {
                temp = scope.$parent.vm.validations[attrs.name][keylist[i]];
                if(temp) {
                  if(typeof temp === 'object') {
                    errorMessage += (temp.message)?temp.message:'';
                  } else if(typeof temp !== 'boolean' && temp.length) {
                    errorMessage += temp;
                  }
                  if(i<keylist.length) {
                    errorMessage += '. ';
                  }
                }
              }
            }
            showError(element, errorMessage);
          } else {
            resetError(element);
          }
        }

        function watchForValidity() {
          scope.$watchCollection(function() { 
            return ctrls[1].$error;
          }, function(newVal, oldVal) {
            console.log('newVal, oldVal', newVal, oldVal);
            if(newVal !== oldVal) {
              processModelErrorObject(newVal);
            }
          });

          scope.$watch(function() { 
            return ctrls[1].$touched;
          }, function(newVal, oldVal) {
            console.log('newVal, oldVal', newVal, oldVal);
            if(newVal) {
              processModelErrorObject(ctrls[1].$error);
            }
          });
        }

        function processTextInput() {
        }

        function processNumberInput() {
          setAttribute('ng-pattern', NUMBER_PATTERN);
        }

        function processEmailInput() {
          setAttribute('ng-pattern', EMAIL_PATTERN);
        }

        function processURLInput() {
          setAttribute('ng-pattern', URL_PATTERN);
        }

        function processSubmitInput() {
        }

        function processDefaultInput() {
        }

        function processAttributes() {
          //set 'id' attribute, if not present
          setAttribute('id', Date.now()+Math.ceil(Math.random()*1000));

          //fall back if user is using ng-required
          if(attrs['required']) {
            setAttribute('ng-required', true);
          }

          //construct the error placeholder for all input elements
          constructErrorPlaceHolder();

          //add event listeners
          watchForValidity();

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