            // js code for graphs menus
            document.querySelector("#addressesMenuToggle").addEventListener('click', function (event) {
            document.body.classList.toggle('toggleAddressesMenu');
            document.body.classList.remove('toggleAddressesChainsMenu');
            document.body.classList.remove('toggleVolumesMenu');
            });
            
            document.querySelector("#addressesChainsMenuToggle").addEventListener('click', function (event) {
            document.body.classList.toggle('toggleAddressesChainsMenu');
            document.body.classList.remove('toggleAddressesMenu');
            document.body.classList.remove('toggleVolumesMenu');
            });
            
            document.querySelector("#volumesMenuToggle").addEventListener('click', function (event) {
            document.body.classList.toggle('toggleVolumesMenu');
            document.body.classList.remove('toggleAddressesMenu');
            document.body.classList.remove('toggleAddressesChainsMenu');
            });
            
            // on mobile version, hide the graphs menus if a link is clicked
            let hideMobileMenu = function(event) {
                if (window.matchMedia("(max-width: 820px)").matches) {
                document.body.classList.remove('toggleAddressesMenu');
                document.body.classList.remove('toggleAddressesChainsMenu');
                document.body.classList.remove('toggleVolumesMenu');
                }
            };
            
            let links = document.getElementsByClassName("graphLink");
            Array.from(links).forEach(function(link) {
                link.addEventListener('click', hideMobileMenu);
            });
            
            document.querySelector("#MobileMenuToggle").addEventListener('click', function (event) {
            document.body.classList.toggle('showMobileMenu');
            document.body.classList.remove('toggleAddressesMenu');
            document.body.classList.remove('toggleAddressesChainsMenu');
            document.body.classList.remove('toggleVolumesMenu');
            });