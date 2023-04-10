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
  height: defaultHeight
  property int defaultHeight: 280
  minimumWidth: 400

  function reload() {
    content.reload()
  }

  onAccepted: {
    if (path.text != "...") {
			alg.settings.setValue("photoshopPath", path.text);
		}
		alg.settings.setValue("launchPhotoshop", launchPhotoshopCheckBox.checked);
		alg.settings.setValue("padding", paddingCheckBox.checked);
    alg.settings.setValue("dilation", dilationSlider.value);

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
      dilationSlider.reload()
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

            onCheckedChanged: {
            dilationGroup.toggled = !checked;
            dilationGroup.visible = !checked;
            }
          }
        }

        AlgGroupWidget {
          id: dilationGroup
          text: qsTr("Export dilation")
          toggled: !paddingCheckBox.checked
          Layout.fillWidth: true
          visible: !paddingCheckBox.checked

          RowLayout {
            spacing: 6
            Layout.fillWidth: true

            AlgSlider {
              id: dilationSlider
              value: 0
              minValue: 0
              maxValue: 256
              precision: 0
              Layout.minimumHeight: 20
              Layout.fillWidth: true
              text: "Dilation(pixels)"

              function reload() {
                var dilation = alg.settings.value("dilation", 0);
                value = dilation;
              }

              onValueChanged: {
              alg.settings.setValue("dilation", value);
              }

              Component.onCompleted: {
                reload()
              }
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
            Layout.minimumWidth: 80
            Layout.minimumHeight: 25

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

  Binding {
    target: configureDialog
    property: "height"
    value: paddingCheckBox.checked ? configureDialog.defaultHeight - 50 : configureDialog.defaultHeight + (dilationGroup.toggled ? 30 : 0)
  }

  Binding {
    target: configureDialog
    property: "height"
    value: dilationGroup.toggled ? configureDialog.defaultHeight + 30 : configureDialog.defaultHeight
  }

}
