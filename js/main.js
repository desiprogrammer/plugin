(function() {
    window.typeahead  = function(id) {
        var countryListUrl = 'https://restcountries.eu/rest/v2/all';
        var currentValue = '';
        var countryList;
        var container = document.createElement('div');
        fetch(countryListUrl).then(function(response){ return response.json()}).then(function(countries){
            attachEvent();
            countryList = countries;
        });

        function attachEvent() {
            document.getElementById(id).addEventListener('keyup',function(event){
                currentValue = document.getElementById(id).value;
                filterCountries(currentValue.toLowerCase());
            });
        }

        function filterCountries(inputValue) {
            var filteredCountries = countryList.filter(function(elem,index,array) {
                return elem.name.toLowerCase().indexOf(inputValue) == -1 ? false : true;
            });
            createDropdown(filteredCountries);
        }

        function createDropdown(list) {
            var prevContainer = document.getElementById('typeahed-container');
            if(prevContainer) {
            prevContainer.parentElement.removeChild(prevContainer); }
            var container = document.createElement('div');
            container.setAttribute('id','typeahed-container');
            container.style.border = '1px solid #ccc';
            container.style.height = 300;
            container.style.width = 150;
            container.style.backgroundColor = '#fcfcfc';
            var ul = document.createElement('ul');
            ul.style.listStyle = 'none';
            ul.style.margin = 0;
            ul.style.padding = 0;
            list.forEach(function(elem,index,array){
                var li = document.createElement('li');
                li.style.padding = 20;
                li.style.borderBottom = '1px solid #ccc';
                li.innerHTML = elem.name;
                ul.appendChild(li);
            });
            var position = getPosition();
            container.style.position = "absolute";
            container.style.left = position.x+'px';
            container.style.top = (position.y + position.height)+'px';
            container.appendChild(ul);
            console.log(container);
            document.body.appendChild(container);
        }

        function getPosition() {
            var input = document.getElementById(id);
            var rect = input.getBoundingClientRect();
            return rect;
        }
    }
})();