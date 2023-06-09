progressBar.close();

/*=============HELPER=============*/

// Rasterize all layers.
function rasterize_All()
{
	try {
		executeAction(stringIDToTypeID('rasterizeAll'), undefined, DialogModes.NO);
	}
	catch (ignored) {}
}
function del_bg()
{
	try {
		var idslct = charIDToTypeID('slct');
		var descB = new ActionDescriptor();
		var idnull = charIDToTypeID('null');
		var refB = new ActionReference();
		var idLyr = charIDToTypeID('Lyr ');
		refB.putName(idLyr, 'Background');
		descB.putReference(idnull, refB);
		var idMkVs = charIDToTypeID('MkVs');
		descB.putBoolean(idMkVs, false);
		executeAction(idslct, descB, DialogModes.NO);
		app.activeDocument.activeLayer.remove();
	}
	catch (ignored) {}
	try {
		var idslct = charIDToTypeID('slct');
		var descB = new ActionDescriptor();
		var idnull = charIDToTypeID('null');
		var refB = new ActionReference();
		var idLyr = charIDToTypeID('Lyr ');
		refB.putName(idLyr, 'Layer 0');
		descB.putReference(idnull, refB);
		var idMkVs = charIDToTypeID('MkVs');
		descB.putBoolean(idMkVs, false);
		executeAction(idslct, descB, DialogModes.NO);
		app.activeDocument.activeLayer.remove();
	}
	catch (ignored) {}
}
function new_layer()
{
	var idMk = charIDToTypeID('Mk  ');
	var desc = new ActionDescriptor();
	var idnull = charIDToTypeID('null');
	var ref = new ActionReference();
	var idLyr = charIDToTypeID('Lyr ');
	ref.putClass(idLyr);
	desc.putReference(idnull, ref);
	executeAction(idMk, desc, DialogModes.NO);
}
function fillSolidColour(R, G, B)
{
  var id117 = charIDToTypeID( "Mk  " );
  var desc25 = new ActionDescriptor();
  var id118 = charIDToTypeID( "null" );
  var ref13 = new ActionReference();
  var id119 = stringIDToTypeID( "contentLayer" );
  ref13.putClass( id119 );
  desc25.putReference( id118, ref13 );
  var id120 = charIDToTypeID( "Usng" );
  var desc26 = new ActionDescriptor();
  var id121 = charIDToTypeID( "Type" );
  var desc27 = new ActionDescriptor();
  var id122 = charIDToTypeID( "Clr " );
  var desc28 = new ActionDescriptor();
  var id123 = charIDToTypeID( "Rd  " );
  desc28.putDouble( id123, R ); //red
  var id124 = charIDToTypeID( "Grn " );
  desc28.putDouble( id124, G ); //green
  var id125 = charIDToTypeID( "Bl  " );
  desc28.putDouble( id125, B ); //blue
  var id126 = charIDToTypeID( "RGBC" );
  desc27.putObject( id122, id126, desc28 );
  var id127 = stringIDToTypeID( "solidColorLayer" );
  desc26.putObject( id121, id127, desc27 );
  var id128 = stringIDToTypeID( "contentLayer" );
  desc25.putObject( id120, id128, desc26 );
  executeAction( id117, desc25, DialogModes.NO );
}
function send_backward()
{
	var id_mov = charIDToTypeID('move');
	var desc_ll = new ActionDescriptor();
	var id_null = charIDToTypeID('null');
	var ref_ll = new ActionReference();
	var id_Lyr = charIDToTypeID('Lyr ');
	var id_Ord = charIDToTypeID('Ordn');
	var id_Trg = charIDToTypeID('Trgt');
	ref_ll.putEnumerated(id_Lyr, id_Ord, id_Trg);
	desc_ll.putReference(id_null, ref_ll);
	var id_T = charIDToTypeID('T   ');
	var ref_d = new ActionReference();
	var id_LL = charIDToTypeID('Lyr ');
	var id_OO = charIDToTypeID('Ordn');
	var id_Prv = charIDToTypeID('Prvs');
	ref_d.putEnumerated(id_LL, id_OO, id_Prv);
	desc_ll.putReference(id_T, ref_d);
	executeAction(id_mov, desc_ll, DialogModes.NO);
}
function center_layer()
{
	var doc = activeDocument;
	var layer = doc.activeLayer;
	var bounds = layer.bounds;
	var res = doc.resolution;
	doc.resizeImage(undefined, undefined, 72, ResampleMethod.NONE);
	var docWidth = Number(doc.width);
	var docHeight = Number(doc.height);
	var layerWidth = Number(bounds[2] - bounds[0]);
	var layerHeight = Number(bounds[3] - bounds[1]);
	var dX = (docWidth - layerWidth) / 2 - Number(bounds[0]);
	var dY = (docHeight - layerHeight) / 2 - Number(bounds[1]);
	try
	{
		if (docWidth == layerWidth &  docHeight == layerHeight)
		{
			layer.translate(dX, dY);
		}
	}
	catch (e) {}
}
function open_png(path_f)
{
	var idPlc = charIDToTypeID('Plc ');
	var desc_sObj = new ActionDescriptor();
	var idnull = charIDToTypeID('null');
	desc_sObj.putPath(idnull, path_f);
	var idFTcs = charIDToTypeID('FTcs');
	var idQCSt = charIDToTypeID('QCSt');
	var idQcsa = charIDToTypeID('Qcsa');
	desc_sObj.putEnumerated(idFTcs, idQCSt, idQcsa);
	var idOfst = charIDToTypeID('Ofst');
	var desc_sObj_2 = new ActionDescriptor();
	var idHrzn = charIDToTypeID('Hrzn');
	var idPxlH = charIDToTypeID('#Pxl');
	desc_sObj_2.putUnitDouble(idHrzn, idPxlH, 0.000000);
	var idVrtc = charIDToTypeID('Vrtc');
	var idPxlV = charIDToTypeID('#Pxl');
	desc_sObj_2.putUnitDouble(idVrtc, idPxlV, 0.000000);
	var idOfst2 = charIDToTypeID('Ofst');
	desc_sObj.putObject(idOfst, idOfst2, desc_sObj_2);
	try
	{
		executeAction(idPlc, desc_sObj, DialogModes.NONE);
		return true;
	}
	catch (e)
	{
		return false;
	}
}
function layerToMask()
{
	var idsetd = charIDToTypeID('setd');
	var desc_Mask = new ActionDescriptor();
	var idnull = charIDToTypeID('null');
	var ref_Mask = new ActionReference();
	var idChnl = charIDToTypeID('Chnl');
	var idfsel = charIDToTypeID('fsel');
	ref_Mask.putProperty(idChnl, idfsel);
	desc_Mask.putReference(idnull, ref_Mask);
	var idT = charIDToTypeID('T   ');
	var idOrdn = charIDToTypeID('Ordn');
	var idAl = charIDToTypeID('Al  ');
	desc_Mask.putEnumerated(idT, idOrdn, idAl);
	executeAction(idsetd, desc_Mask, DialogModes.NO);
	var idcopy = charIDToTypeID('copy');
	executeAction(idcopy, undefined, DialogModes.NO);
	app.activeDocument.activeLayer.remove();
	var idMk = charIDToTypeID('Mk  ');
	var desc_select_all = new ActionDescriptor();
	var idNw = charIDToTypeID('Nw  ');
	var idChnl = charIDToTypeID('Chnl');
	desc_select_all.putClass(idNw, idChnl);
	var idAt = charIDToTypeID('At  ');
	var ref_select_all = new ActionReference();
	var idChnl = charIDToTypeID('Chnl');
	var idChnl = charIDToTypeID('Chnl');
	var idMsk = charIDToTypeID('Msk ');
	ref_select_all.putEnumerated(idChnl, idChnl, idMsk);
	desc_select_all.putReference(idAt, ref_select_all);
	var idUsng = charIDToTypeID('Usng');
	var idUsrM = charIDToTypeID('UsrM');
	var idRvlS = charIDToTypeID('RvlS');
	desc_select_all.putEnumerated(idUsng, idUsrM, idRvlS);
	executeAction(idMk, desc_select_all, DialogModes.NO);
	var idslct = charIDToTypeID('slct');
	var desc_aa = new ActionDescriptor();
	var idnull = charIDToTypeID('null');
	var ref_aa = new ActionReference();
	var idChnl = charIDToTypeID('Chnl');
	var idOrdn = charIDToTypeID('Ordn');
	var idTrgt = charIDToTypeID('Trgt');
	ref_aa.putEnumerated(idChnl, idOrdn, idTrgt);
	desc_aa.putReference(idnull, ref_aa);
	var idMkVs = charIDToTypeID('MkVs');
	desc_aa.putBoolean(idMkVs, true);
	executeAction(idslct, desc_aa, DialogModes.NO);
	var idpast = charIDToTypeID('past');
	var desc_past = new ActionDescriptor();
	var idAntA = charIDToTypeID('AntA');
	var idAnnt = charIDToTypeID('Annt');
	var idAnno = charIDToTypeID('Anno');
	desc_past.putEnumerated(idAntA, idAnnt, idAnno);
	executeAction(idpast, desc_past, DialogModes.NO);
	var idsetd = charIDToTypeID('setd');
	var desc_deselect = new ActionDescriptor();
	var idnull = charIDToTypeID('null');
	var ref_deselect = new ActionReference();
	var idChnl = charIDToTypeID('Chnl');
	var idfsel = charIDToTypeID('fsel');
	ref_deselect.putProperty(idChnl, idfsel);
	desc_deselect.putReference(idnull, ref_deselect);
	var idT = charIDToTypeID('T   ');
	var idOrdn = charIDToTypeID('Ordn');
	var idNone = charIDToTypeID('None');
	desc_deselect.putEnumerated(idT, idOrdn, idNone);
	executeAction(idsetd, desc_deselect, DialogModes.NO);
}
function applyLayerMask() 
{
    var idapplyLayerMask = charIDToTypeID("GrpL");
    var desc_applyLayerMask = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    var ref_applyLayerMask = new ActionReference();
    var idLyr = charIDToTypeID("Lyr ");
    var idOrdn = charIDToTypeID("Ordn");
    var idTrgt = charIDToTypeID("Trgt");
    ref_applyLayerMask.putEnumerated(idLyr, idOrdn, idTrgt);
    desc_applyLayerMask.putReference(idnull, ref_applyLayerMask);
    executeAction(idapplyLayerMask, desc_applyLayerMask, DialogModes.NO);
}
function Overlay_Normal(enabled, withDialog)
{
	try {
		if (enabled != undefined && !enabled)
			return;
		var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
		var desc_on_1 = new ActionDescriptor();
		var ref_on = new ActionReference();
		ref_on.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
		desc_on_1.putReference(charIDToTypeID('null'), ref_on);
		var desc_on_2 = new ActionDescriptor();
		desc_on_2.putEnumerated(charIDToTypeID('Md  '), charIDToTypeID('BlnM'), stringIDToTypeID('linearLight'));
		desc_on_2.putUnitDouble(stringIDToTypeID('fillOpacity'), charIDToTypeID('#Prc'), 50);
		desc_on_2.putBoolean(stringIDToTypeID('blendInterior'), true);
		var desc_on_3 = new ActionDescriptor();
		desc_on_3.putUnitDouble(charIDToTypeID('Scl '), charIDToTypeID('#Prc'), 100);
		var desc_on_4 = new ActionDescriptor();
		desc_on_4.putBoolean(charIDToTypeID('enab'), true);
		desc_on_4.putEnumerated(charIDToTypeID('Md  '), charIDToTypeID('BlnM'), stringIDToTypeID('linearBurn'));
		desc_on_4.putUnitDouble(charIDToTypeID('Opct'), charIDToTypeID('#Prc'), 100);
		var desc_on_5 = new ActionDescriptor();
		desc_on_5.putDouble(charIDToTypeID('Rd  '), 255);
		desc_on_5.putDouble(charIDToTypeID('Grn '), 255);
		desc_on_5.putDouble(charIDToTypeID('Bl  '), 127.998046875);
		desc_on_4.putObject(charIDToTypeID('Clr '), stringIDToTypeID('RGBColor'), desc_on_5);
		desc_on_3.putObject(charIDToTypeID('SoFi'), charIDToTypeID('SoFi'), desc_on_4);
		desc_on_2.putObject(charIDToTypeID('Lefx'), charIDToTypeID('Lefx'), desc_on_3);
		desc_on_1.putObject(charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc_on_2);
		executeAction(charIDToTypeID('setd'), desc_on_1, dialogMode);
	}
	catch (ignored) {}
}
