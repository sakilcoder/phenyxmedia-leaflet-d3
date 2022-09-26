function onEachArea(feature, layer) {

    layer.on('mouseover', function (e) {
        this.setStyle({
            'fillColor': '#a3bf82'
        });
    });

    layer.on('mouseout', function (e) {
        this.setStyle({
            'fillColor': '#b7d18a'
        });
    });

}
function onEachAoi(feature, layer) {

    layer.on('click', function (e) {
        if(countyLayer){
            map.removeLayer(countyLayer);
        }
        let scounty = filterCounty(e.target.feature.properties.name);
        countyLayer = L.geoJSON(scounty, {
            style: styleCounty,
            // onEachFeature: onEachAoi,
        }).addTo(map);
        map.fitBounds(countyLayer.getBounds());
    });

    layer.on('mouseover', function (e) {
        this.setStyle({
            'fillColor': '#a3bf82'
        });
    });

    layer.on('mouseout', function (e) {
        this.setStyle({
            'fillColor': '#719b6b'
        });
    });

}
function onEachMarker(feature, layer) {

    const iconUrl = 'assets/icon/logo16x.png';
    layer.setIcon(pngIcon(iconUrl));

    var popup = L.popup();
    let str_popup = '';
    str_popup += '<h5 class="text-center" style="font-weight: bold">Spectra of '+ feature.properties.name +'</h5>';
    str_popup += '<table style="width: 100%">';
    str_popup += '<tr><td class="text-center">Phone: ' + feature.properties.phone + '</td></tr>';
    str_popup += '<tr><td class="text-center"></td></tr>';
    str_popup += '<tr><td class="text-center">' + feature.properties.city + ', ' + feature.properties.state + ', ' + feature.properties.zip + '</td></tr>';
    str_popup += '</table>';

    popup.setContent(str_popup);
    layer.bindPopup(popup, popupOptions);

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);
    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
    });

    layer.on('click', function (e) {
        
        let urlCity = e.target.feature.properties.url;
        window.location.href = "https://www.spectrametalsleads.com/locations/" + urlCity;
    });

}

var filterCounty = function(state_name){
    return _.filter(counties.features, function (county) {
        return [state_name].indexOf(county.properties.STATE_NAME) !== -1; // -1 means not present
    });
}

var getIcon = function (type) {
    gi = '<i class="fa fa-shopping-bag g-circle" style="font-size:14px; color: #0099ff"></i>';
    // gi = '<i class="fas fa-shopping-bag" style="font-size:14px; color: #0099ff"></i>';
    // gi = '<i class="fas fa-shopping-cart" style="font-size:14px; color: #0099ff"></i>';
    var icon1 = GoogleIcon('<span class="g-icon">' + gi + '</span>');
    return icon1;
}
