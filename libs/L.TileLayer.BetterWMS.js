// -----------------TIANG START----------------------

L.TileLayer.BetterWMSRTRW = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
      showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      // url: url,
      url: "proxy.php?url=" + encodeURIComponent(url),
      success: function (data, status, xhr) {
        var err = typeof data === "string" ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);
      },
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
      size = this._map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: this.wmsParams.styles,
        transparent: this.wmsParams.transparent,
        version: this.wmsParams.version,
        format: this.wmsParams.format,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this.wmsParams.layers,
        query_layers: this.wmsParams.layers,
        // info_format: 'text/html'
        info_format: "application/json",
      };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error

    // Otherwise show the content in a popup, or something.
    L.popup({ maxWidth: 800 }).setLatLng(latlng).setContent(content).openOn(this._map);
  },
});

L.tileLayer.betterWmsRTRW = function (url, options) {
  return new L.TileLayer.BetterWMSRTRW(url, options);
};

// -----------------TIANG END----------------------

// -----------------PELANGGAN START----------------------

L.TileLayer.BetterWMSPelanggan = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
      showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      // url: url,
      url: "proxy.php?url=" + encodeURIComponent(url),
      success: function (data, status, xhr) {
        var err = typeof data === "string" ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);
      },
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
      size = this._map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: this.wmsParams.styles,
        transparent: this.wmsParams.transparent,
        version: this.wmsParams.version,
        format: this.wmsParams.format,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this.wmsParams.layers,
        query_layers: this.wmsParams.layers,
        // info_format: 'text/html'
        info_format: "application/json",
      };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    content = JSON.parse(content);
    console.log(content);
    t1 = content;
    var no_kontrak = t1.features[0].properties.no_kontrak;
    var idpel = t1.features[0].properties.idpel;
    var nama = t1.features[0].properties.nama;
    var alamat = t1.features[0].properties.alamat;
    var daya = t1.features[0].properties.daya;
    var tampil =
      "<table class='table table-striped table-bordered table-condensed' style='margin-bottom:0;'>" +
      "<tr><th style='width:30%;'>No Kontrak</th><td>" +
      no_kontrak +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Id Pelanggan</th><td>" +
      idpel +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Nama</th><td>" +
      nama +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Alamat</th><td>" +
      alamat +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Daya</th><td>" +
      daya +
      "</td></tr></table>";
    $("#feature-title").html("DATA PELANGGAN");
    $("#feature-info").html(tampil);
    $("#featureModal").modal("show");
  },
});

L.tileLayer.betterWmsPelanggan = function (url, options) {
  return new L.TileLayer.BetterWMSPelanggan(url, options);
};

// -----------------PELANGGAN END----------------------

// -----------------GARDU START----------------------

L.TileLayer.BetterWMSGardu = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
      showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      // url: url,
      url: "proxy.php?url=" + encodeURIComponent(url),
      success: function (data, status, xhr) {
        var err = typeof data === "string" ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);
      },
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
      size = this._map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: this.wmsParams.styles,
        transparent: this.wmsParams.transparent,
        version: this.wmsParams.version,
        format: this.wmsParams.format,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this.wmsParams.layers,
        query_layers: this.wmsParams.layers,
        // info_format: 'text/html'
        info_format: "application/json",
      };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    content = JSON.parse(content);
    console.log(content);
    t1 = content;
    var kode = t1.features[0].properties.description;
    var lokasi_induk = t1.features[0].properties.parent_location;
    var koordinatx = t1.features[0].properties.longitudex;
    var koordinaty = t1.features[0].properties.latitudey;
    var daya = t1.features[0].properties.kapasitas;
    var tampil =
      "<table class='table table-striped table-bordered table-condensed' style='margin-bottom:0;'>" +
      "<tr><th style='width:30%;'>Kode Gardu</th><td>" +
      kode +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Lokasi Induk</th><td>" +
      lokasi_induk +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Koordinat X</th><td>" +
      koordinatx +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Koordinat Y</th><td>" +
      koordinaty +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Daya Trafo</th><td>" +
      daya +
      "</td></tr></table>";
    $("#feature-title").html("DATA GARDU");
    $("#feature-info").html(tampil);
    $("#featureModal").modal("show");
  },
});

L.tileLayer.betterWmsGardu = function (url, options) {
  return new L.TileLayer.BetterWMSGardu(url, options);
};

// -----------------GARDU END----------------------

// -----------------LBS START----------------------

L.TileLayer.BetterWMSLbs = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
      showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      // url: url,
      url: "proxy.php?url=" + encodeURIComponent(url),
      success: function (data, status, xhr) {
        var err = typeof data === "string" ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);
      },
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
      size = this._map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: this.wmsParams.styles,
        transparent: this.wmsParams.transparent,
        version: this.wmsParams.version,
        format: this.wmsParams.format,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this.wmsParams.layers,
        query_layers: this.wmsParams.layers,
        // info_format: 'text/html'
        info_format: "application/json",
      };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    content = JSON.parse(content);
    console.log(content);
    t1 = content;
    var kode = t1.features[0].properties.description;
    var kode_hantaran = t1.features[0].properties.kode_hantaran;
    var lokasi = t1.features[0].properties.location;
    var type_lbs = t1.features[0].properties.type_lbs;
    var th_buat = t1.features[0].properties.th_buat;
    var tampil =
      "<table class='table table-striped table-bordered table-condensed' style='margin-bottom:0;'>" +
      "<tr><th style='width:30%;'>Kode LBS</th><td>" +
      kode +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Lokasi</th><td>" +
      lokasi +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Kode Hantaran</th><td>" +
      kode_hantaran +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Tipe LBS</th><td>" +
      type_lbs +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Tahun Buat</th><td>" +
      th_buat +
      "</td></tr></table>";
    $("#feature-title").html("DATA LBS");
    $("#feature-info").html(tampil);
    $("#featureModal").modal("show");
  },
});

L.tileLayer.betterWmsLbs = function (url, options) {
  return new L.TileLayer.BetterWMSLbs(url, options);
};

// -----------------LBS END----------------------

// -----------------FCO START----------------------

L.TileLayer.BetterWMSFco = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
      showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      // url: url,
      url: "proxy.php?url=" + encodeURIComponent(url),
      success: function (data, status, xhr) {
        var err = typeof data === "string" ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);
      },
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
      size = this._map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: this.wmsParams.styles,
        transparent: this.wmsParams.transparent,
        version: this.wmsParams.version,
        format: this.wmsParams.format,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this.wmsParams.layers,
        query_layers: this.wmsParams.layers,
        // info_format: 'text/html'
        info_format: "application/json",
      };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    content = JSON.parse(content);
    console.log(content);
    t1 = content;
    var kode = t1.features[0].properties.description;
    var kode_hantaran = t1.features[0].properties.kode_hantaran;
    var lokasi = t1.features[0].properties.location;
    var type_fuse = t1.features[0].properties.type_fuse;
    var jenis_fuse = t1.features[0].properties.jenis_fuse;
    var jenis_fco = t1.features[0].properties.jenis_fco;
    var tampil =
      "<table class='table table-striped table-bordered table-condensed' style='margin-bottom:0;'>" +
      "<tr><th style='width:30%;'>Kode FCO</th><td>" +
      kode +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Lokasi</th><td>" +
      lokasi +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Kode Hantaran</th><td>" +
      kode_hantaran +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Tipe Fuse</th><td>" +
      type_fuse +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Jenis Fuse</th><td>" +
      jenis_fuse +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Jenis Fco</th><td>" +
      jenis_fco +
      "</td></tr></table>";
    $("#feature-title").html("DATA FCO");
    $("#feature-info").html(tampil);
    $("#featureModal").modal("show");
  },
});

L.tileLayer.betterWmsFco = function (url, options) {
  return new L.TileLayer.BetterWMSFco(url, options);
};

// -----------------FCO END----------------------

// -----------------RECLOSER START----------------------

L.TileLayer.BetterWMSRecloser = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
      showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      // url: url,
      url: "proxy.php?url=" + encodeURIComponent(url),
      success: function (data, status, xhr) {
        var err = typeof data === "string" ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);
      },
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
      size = this._map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: this.wmsParams.styles,
        transparent: this.wmsParams.transparent,
        version: this.wmsParams.version,
        format: this.wmsParams.format,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this.wmsParams.layers,
        query_layers: this.wmsParams.layers,
        // info_format: 'text/html'
        info_format: "application/json",
      };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    content = JSON.parse(content);
    console.log(content);
    t1 = content;
    var kode = t1.features[0].properties.description;
    var kode_hantaran = t1.features[0].properties.kode_hantaran;
    var lokasi = t1.features[0].properties.location;
    var type_recloser = t1.features[0].properties.type_recloser;
    var th_buat = t1.features[0].properties.th_buat;
    var tampil =
      "<table class='table table-striped table-bordered table-condensed' style='margin-bottom:0;'>" +
      "<tr><th style='width:30%;'>Kode Recloser</th><td>" +
      kode +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Lokasi</th><td>" +
      lokasi +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Kode Hantaran</th><td>" +
      kode_hantaran +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Tipe Recloser</th><td>" +
      type_recloser +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Tahun Buat</th><td>" +
      th_buat +
      "</td></tr></table>";
    $("#feature-title").html("DATA RECLOSER");
    $("#feature-info").html(tampil);
    $("#featureModal").modal("show");
  },
});

L.tileLayer.betterWmsRecloser = function (url, options) {
  return new L.TileLayer.BetterWMSRecloser(url, options);
};

// -----------------RECLOSER END----------------------

// -----------------ARRESTER START----------------------

L.TileLayer.BetterWMSArrester = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
      showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      // url: url,
      url: "proxy.php?url=" + encodeURIComponent(url),
      success: function (data, status, xhr) {
        var err = typeof data === "string" ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);
      },
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
      size = this._map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: this.wmsParams.styles,
        transparent: this.wmsParams.transparent,
        version: this.wmsParams.version,
        format: this.wmsParams.format,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this.wmsParams.layers,
        query_layers: this.wmsParams.layers,
        // info_format: 'text/html'
        info_format: "application/json",
      };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    content = JSON.parse(content);
    console.log(content);
    t1 = content;
    var kode = t1.features[0].properties.description;
    var kode_hantaran = t1.features[0].properties.kode_hantaran;
    var lokasi = t1.features[0].properties.location;
    var jenis_holder = t1.features[0].properties.jenis_holder;
    var jenis_arrester = t1.features[0].properties.jenis_arrester;
    var tegangan_tembus = t1.features[0].properties.tegangan_tembus;
    var nominal_arus = t1.features[0].properties.nominal_arus;
    var tampil =
      "<table class='table table-striped table-bordered table-condensed' style='margin-bottom:0;'>" +
      "<tr><th style='width:30%;'>Kode Arrester</th><td>" +
      kode +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Lokasi</th><td>" +
      lokasi +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Kode Hantaran</th><td>" +
      kode_hantaran +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Jenis Holder</th><td>" +
      jenis_holder +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Jenis Arrester</th><td>" +
      jenis_arrester +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Tegangan Tembus</th><td>" +
      tegangan_tembus +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Nominal Arus</th><td>" +
      nominal_arus +
      "</td></tr></table>";
    $("#feature-title").html("DATA ARRESTER");
    $("#feature-info").html(tampil);
    $("#featureModal").modal("show");
  },
});

L.tileLayer.betterWmsArrester = function (url, options) {
  return new L.TileLayer.BetterWMSArrester(url, options);
};

// -----------------ARRESTER END----------------------

// -----------------CUBICLE START----------------------

L.TileLayer.BetterWMSCubicle = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
      showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      // url: url,
      url: "proxy.php?url=" + encodeURIComponent(url),
      success: function (data, status, xhr) {
        var err = typeof data === "string" ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);
      },
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
      size = this._map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: this.wmsParams.styles,
        transparent: this.wmsParams.transparent,
        version: this.wmsParams.version,
        format: this.wmsParams.format,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this.wmsParams.layers,
        query_layers: this.wmsParams.layers,
        // info_format: 'text/html'
        info_format: "application/json",
      };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    content = JSON.parse(content);
    console.log(content);
    t1 = content;
    var kode = t1.features[0].properties.description;
    var type_mvcell = t1.features[0].properties.type_mvcell;
    var lokasi = t1.features[0].properties.location;
    var jenis_mvcell = t1.features[0].properties.jenis_mvcell;
    var isolasi_kubikel = t1.features[0].properties.isolasi_kubikel;
    var th_buat = t1.features[0].properties.th_buat;
    var tampil =
      "<table class='table table-striped table-bordered table-condensed' style='margin-bottom:0;'>" +
      "<tr><th style='width:30%;'>Kode Cubicle</th><td>" +
      kode +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Lokasi</th><td>" +
      lokasi +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Tipe Mvcell</th><td>" +
      type_mvcell +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Jenis Mvcell</th><td>" +
      jenis_mvcell +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Isolasi Kubikel</th><td>" +
      isolasi_kubikel +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Tahun Buat</th><td>" +
      th_buat +
      "</td></tr></table>";
    $("#feature-title").html("DATA CUBICLE");
    $("#feature-info").html(tampil);
    $("#featureModal").modal("show");
  },
});

L.tileLayer.betterWmsCubicle = function (url, options) {
  return new L.TileLayer.BetterWMSCubicle(url, options);
};

// -----------------CUBICLE END----------------------

// -----------------SECTIONALIZER START----------------------

L.TileLayer.BetterWMSSectionalizer = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
      showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      // url: url,
      url: "proxy.php?url=" + encodeURIComponent(url),
      success: function (data, status, xhr) {
        var err = typeof data === "string" ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);
      },
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
      size = this._map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: this.wmsParams.styles,
        transparent: this.wmsParams.transparent,
        version: this.wmsParams.version,
        format: this.wmsParams.format,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this.wmsParams.layers,
        query_layers: this.wmsParams.layers,
        // info_format: 'text/html'
        info_format: "application/json",
      };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    content = JSON.parse(content);
    console.log(content);
    t1 = content;
    var kode = t1.features[0].properties.description;
    var kode_hantaran = t1.features[0].properties.kode_hantaran;
    var lokasi = t1.features[0].properties.location;
    var type_sectionalizer = t1.features[0].properties.type_sectionalizer;
    var th_buat = t1.features[0].properties.th_buat;
    var tampil =
      "<table class='table table-striped table-bordered table-condensed' style='margin-bottom:0;'>" +
      "<tr><th style='width:30%;'>Kode Sectionalizer</th><td>" +
      kode +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Lokasi</th><td>" +
      lokasi +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Kode Hantaran</th><td>" +
      kode_hantaran +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Tipe Sectionalizer</th><td>" +
      type_sectionalizer +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Tahun Buat</th><td>" +
      th_buat +
      "</td></tr></table>";
    $("#feature-title").html("DATA SECTIONALIZER");
    $("#feature-info").html(tampil);
    $("#featureModal").modal("show");
  },
});

L.tileLayer.betterWmsSectionalizer = function (url, options) {
  return new L.TileLayer.BetterWMSSectionalizer(url, options);
};

// -----------------SECTIONALIZER END----------------------

// -----------------PEMBANGKIT START----------------------

L.TileLayer.BetterWMSPembangkit = L.TileLayer.WMS.extend({
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on("click", this.getFeatureInfo, this);
  },

  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off("click", this.getFeatureInfo, this);
  },

  getFeatureInfo: function (evt) {
    // Make an AJAX request to the server and hope for the best
    var url = this.getFeatureInfoUrl(evt.latlng),
      showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      // url: url,
      url: "proxy.php?url=" + encodeURIComponent(url),
      success: function (data, status, xhr) {
        var err = typeof data === "string" ? null : data;
        showResults(err, evt.latlng, data);
      },
      error: function (xhr, status, error) {
        showResults(error);
      },
    });
  },

  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
      size = this._map.getSize(),
      params = {
        request: "GetFeatureInfo",
        service: "WMS",
        srs: "EPSG:4326",
        styles: this.wmsParams.styles,
        transparent: this.wmsParams.transparent,
        version: this.wmsParams.version,
        format: this.wmsParams.format,
        bbox: this._map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: this.wmsParams.layers,
        query_layers: this.wmsParams.layers,
        // info_format: 'text/html'
        info_format: "application/json",
      };

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  showGetFeatureInfo: function (err, latlng, content) {
    if (err) {
      console.log(err);
      return;
    } // do nothing if there's an error
    content = JSON.parse(content);
    console.log(content);
    t1 = content;
    var kode = t1.features[0].properties.description;
    var kode_hantaran = t1.features[0].properties.kode_hantaran;
    var lokasi = t1.features[0].properties.location;
    var induk = t1.features[0].properties.parent;
    var alamat = t1.features[0].properties.streetaddress;
    var kota = t1.features[0].properties.city;
    var tampil =
      "<table class='table table-striped table-bordered table-condensed' style='margin-bottom:0;'>" +
      "<tr><th style='width:30%;'>Kode Pembangkit</th><td>" +
      kode +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Lokasi</th><td>" +
      lokasi +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Induk</th><td>" +
      parent +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Alamat</th><td>" +
      alamat +
      "</td></tr>" +
      "<tr><th style='width:30%;'>Kota</th><td>" +
      kota +
      "</td></tr></table>";
    $("#feature-title").html("DATA PEMBANGKIT");
    $("#feature-info").html(tampil);
    $("#featureModal").modal("show");
  },
});

L.tileLayer.betterWmsPembangkit = function (url, options) {
  return new L.TileLayer.BetterWMSPembangkit(url, options);
};

// -----------------PEMBANGKIT END----------------------
