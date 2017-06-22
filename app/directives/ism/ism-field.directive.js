(function() {''
  'use strict';

  angular.module('jtAngularPlayground.ISM').directive('ismField', IsmField);
  function IsmField ($log, $compile) {
    return {
      restrict: 'A',
      require: ['^form','ngModel'],
      scope: {},
      link: function (scope, element, attrs, ctrls) {
        var EMAIL_PATTERN = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
        var URL_PATTERN = 'http?://.+';
        var NAME_PATTERN = '^[a-zA-Z](\s?[a-zA-Z]){1,30}$';
        var NUMBER_PATTERN = '/\[0-9]/g';

        //utility functions
        function upperCaseFirst(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function setAttribute(name, value, forceSet) {
          // if(!attrs.hasOwnProperty(name) || forceSet) {
          //   (value)?attrs.$set(name, value):attrs.$set(name, true);
          // }

          //deal directly with the element
          if(!element.attr(name) || forceSet) {
            (value)?element.attr(name, value):element.attr(name, true);
          }
        }

        function removeAttribute(name) {
          if(element.attr(name)) {
            element.removeAttr(name);
          }
        }

        function constructErrorPlaceHolder() {
          var elem = angular.element('<div>');
          var id = 'notify'+element.attr('id');
          elem.attr('id', id);
          elem.attr('role', 'alert');
          elem.css('display', 'none');
          ctrls[0].$$element.append(elem);

          element.attr('aria-describedby', id);
        }

        function addLabel() {
          var labelName = attrs.name || attrs.placeholder || attrs.type;
          var requiredStar = (attrs.required || attrs['ng-required'])?'*':'';
          var elem = angular.element('<label for='+element.attr('id')+'>'+labelName+' '+requiredStar+'</label>' );
          elem.attr('aria-hidden', true);
          elem.css('display', 'none');
          ctrls[1].$$element.after(elem);
        }

        function showError(elem, errorMessage) {
          var errorElem = ctrls[0].$$element[0].querySelector('div #notify'+element.attr('id'));
          var messageToShow = (errorMessage)?errorMessage+elem[0].validationMessage:elem[0].validationMessage;
          var placeholder = elem.attr('placeholder');

          elem.addClass('invalid shake');
          errorElem.textContent   = (placeholder) ? placeholder + ': ' + messageToShow : messageToShow;
          errorElem.className     = 'error';
          errorElem.style.display = 'block';

          setAttribute('aria-invalid', true);
        }

        function resetError(elem) {
          var errorElem = ctrls[0].$$element[0].querySelector('div #notify'+element.attr('id'));
          if ( 'block' === errorElem.style.display ) {
            elem.removeClass('invalid shake');
            errorElem.style.display = 'none';
            removeAttribute('aria-invalid');
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

        function watchErrors() {
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
          // setAttribute('ng-pattern', NUMBER_PATTERN);
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
          var id = Date.now()+Math.ceil(Math.random()*1000);
          setAttribute('id', id);
          setAttribute('aria-labelledby', id);

          //fall back if user is using ng-required
          if(attrs['required']) {
            setAttribute('ng-required', true);
            setAttribute('aria-required', true);
          }

          //construct the error placeholder for all input elements
          constructErrorPlaceHolder();

          //add watchers - error watcher & touched watcher
          watchErrors();

          switch(attrs.type) {
            case 'text':
            addLabel();
            processTextInput();
            break;

            case 'number':
            addLabel();
            processNumberInput();
            break;

            case 'email':
            addLabel();
            processEmailInput();
            break;

            case 'url':
            addLabel();
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

  IsmField.$inject = ['$log', '$compile'];
}());