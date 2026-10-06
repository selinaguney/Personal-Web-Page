const openLayersMap = new ol.Map({

    target: 'openlayers-map',

    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({
                wrapX: false
            })
        })
    ],

    view: new ol.View({

        center: ol.proj.fromLonLat([
            32.8597,
            39.9334
        ]),

        zoom: 7,

        extent: ol.proj.transformExtent(
            [-180, -85, 180, 85],
            'EPSG:4326',
            'EPSG:3857'
        )

    })

});