import QtQuick 2.3
import QtQuick.Window 2.2
import QtQuick.Dialogs 1.2
import QtQuick.Controls 2.0
import QtQuick.Layouts 1.3
import AlgWidgets 2.0

AlgDialog {
  id: configureDialog
  visible: false
  title: "configure"
  width: 500
  height: 260
  minimumWidth: 400
  minimumHeight: 220

  function reload() {
    content.reload()
  }

  onAccepted: {
    if (path.text != "...") {
			alg.settings.setValue("photoshopPath", path.text);
		}
		alg.settings.setValue("launchPhotoshop", launchPhotoshopCheckBox.checked);
		alg.settings.setValue("padding", paddingCheckBox.checked);
        var indexDilation = dilationComboBox.currentIndex;
        alg.settings.setValue("dilation", dilationModel.get(indexDilation).value);
        var index = bitDepthComboBox.currentIndex
        alg.settings.setValue("bitDepth", bitDepthModel.get(index).value);
  }

  Rectangle {
    id: content
    parent: contentItem
    anchors.fill: parent
    anchors.margins: 12
    color: "transparent"
    clip: true

    function reload() {
      path.reload()
      launchPhotoshopCheckBox.reload()
      paddingCheckBox.reload()
      dilationComboBox.reload()
      bitDepthComboBox.reload()
    }

    AlgScrollView {
      id: scrollView
      anchors.fill: parent

      ColumnLayout {
        spacing: 18
        Layout.maximumWidth: scrollView.viewportWidth
        Layout.minimumWidth: scrollView.viewportWidth

        ColumnLayout {
          spacing: 6
          Layout.fillWidth: true

          AlgLabel {
            text: qsTr("Path to Photoshop")
            Layout.fillWidth: true
          }

          RowLayout {
            spacing: 6
            Layout.fillWidth: true

            AlgTextEdit {
              id: path
              borderActivated: true
              wrapMode: TextEdit.Wrap
              readOnly: true
              Layout.fillWidth: true

              function reload() {
                text = alg.settings.value("photoshopPath", "...")
              }

              Component.onCompleted: {
                reload()
              }
            }

            AlgButton {
              id: searchPathButton
              text: qsTr("Set path")
              onClicked: {
                // open the search path dialog
                searchPathDialog.setVisible(true)
              }
            }
          }
        }

        RowLayout {
          spacing: 6
          Layout.fillWidth: true

          AlgLabel {
            text: qsTr("Launch photoshop after export")
            Layout.fillWidth: true
          }

          AlgCheckBox {
            id: launchPhotoshopCheckBox

            function reload() {
              checked = alg.settings.value("launchPhotoshop", false);
            }

            Component.onCompleted: {
              reload()
            }
          }
        }

        RowLayout {
          spacing: 6
          AlgLabel {
            text: qsTr("Enable padding")
            Layout.fillWidth: true
          }

          AlgCheckBox {
            id: paddingCheckBox

            function reload() {
              checked = alg.settings.value("padding", false);
            }

            Component.onCompleted: {
              reload()
            }
          }
        }

        RowLayout {
          spacing: 6
          Layout.fillWidth: true

          AlgLabel {
            text: qsTr("Export dilation (Padding off)")
            Layout.fillWidth: true
          }

          AlgComboBox {
            id:dilationComboBox
            textRole: "opt"
            Layout.minimumWidth: 150

            model: ListModel {
              id: dilationModel
              ListElement { opt: "0"; value: 0 }
              ListElement { opt: "1"; value: 1 }
              ListElement { opt: "2"; value: 2 }
              ListElement { opt: "3"; value: 3 }
              ListElement { opt: "4"; value: 4 }
              ListElement { opt: "5"; value: 5 }
              ListElement { opt: "6"; value: 6 }
              ListElement { opt: "7"; value: 7 }
              ListElement { opt: "8"; value: 8 }
              ListElement { opt: "9"; value: 9 }
              ListElement { opt: "10"; value: 10 }
            }

            function reload() {
              var dilation = alg.settings.value ("dilation", 0);
              for (var i = 0; i < dilationModel.count; ++i){
                var current = dilationModel.get(i);
                if (dilation === current.value){
                  currentIndex = i;
                  break
                }
              } 
            }

            Component.onCompleted: {
              reload()
            }
          }
        }

        RowLayout {
          spacing: 6
          Layout.fillWidth: true

          AlgLabel {
            text: qsTr("Export bitdepth")
            Layout.fillWidth: true
          }

          AlgComboBox {
            id: bitDepthComboBox
            textRole: "key"
            Layout.minimumWidth: 150

            model: ListModel {
              id: bitDepthModel
              ListElement { key: "TextureSet value"; value: -1 }
              ListElement { key: "8 bits"; value: 8 }
              ListElement { key: "16 bits"; value: 16 }
            }
            function reload() {
              var bitdepth = alg.settings.value("bitDepth", -1);
              for (var i = 0; i < bitDepthModel.count; ++i) {
                var current = bitDepthModel.get(i);
                if (bitdepth === current.value) {
                  currentIndex = i;
                  break
                }
              }
            }
            Component.onCompleted: {
              reload()
            }
          }
        }
      }
    }
  }

  FileDialog {
    id: searchPathDialog
    title: qsTr("Choose a Photoshop executable file...")
    nameFilters: [ "Photoshop files (*.exe *.app)", "All files (*)" ]
    selectedNameFilter: "Executable files (*)"
    onAccepted: {
      path.text = alg.fileIO.urlToLocalFile(fileUrl.toString())
    }
    onVisibleChanged: {
      if (!visible) {
        configureDialog.requestActivate();
      }
    }
  }
}
