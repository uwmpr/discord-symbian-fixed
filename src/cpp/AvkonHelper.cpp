#include "AvkonHelper.h"

#ifdef USE_AVKON
#include <akndiscreetpopup.h>
#include <aknglobalnote.h>
#include <aknappui.h>
#endif

#include <QTimer>
#include <QString>
#include <QtDeclarative/QDeclarativeView>

AvkonHelper::AvkonHelper(QDeclarativeView *view, QObject *parent) : QObject(parent), m_view(view) {}

#ifdef USE_AVKON
const TUid DiscordUid = {0xEA2EE72D};
TPtrC16 convertToSymbianString(QString string) {
  return reinterpret_cast<const TUint16*>(string.utf16());
}
#endif

void AvkonHelper::showPopup(QString title, QString message) {
#ifdef USE_AVKON
    if (lastPopup != title + ";" + message) lastPopup = title + ";" + message; else return;

    if (_switchToApp) {
        TRAP_IGNORE(CAknDiscreetPopup::ShowGlobalPopupL(convertToSymbianString(title), convertToSymbianString(message),KAknsIIDNone, KNullDesC, 0, 0, KAknDiscreetPopupDurationLong, 0, NULL, DiscordUid));
    } else TRAP_IGNORE(CAknDiscreetPopup::ShowGlobalPopupL(convertToSymbianString(title), convertToSymbianString(message),KAknsIIDNone, KNullDesC, 0, 0, KAknDiscreetPopupDurationLong, 0, NULL));
    QTimer::singleShot(2000,this,SLOT(cleanLastMsg()));
#endif
    qint32 uid = api.createNotification(title, message);

            if(uid > 0) {
                static QImage piglerImage("logo.png");
                api.setNotificationIcon(uid, piglerImage);
            }
}
void AvkonHelper::minimize() const {
    m_view->lower();
}

void AvkonHelper::init(){


    qint32 response = api.init();


}
void AvkonHelper::clearAllNot(){
    api.removeAllNotifications();
}
