#ifndef AVKONHELPER_H
#define AVKONHELPER_H

#include <QString>
#include <QObject>
#include "pigler/qt-library/inc/QPiglerAPI.h"


class QDeclarativeView;

class AvkonHelper : public QObject
{
    Q_OBJECT
public:

    explicit AvkonHelper(QDeclarativeView *view, QObject *parent = 0);
    Q_INVOKABLE void showPopup(QString title, QString message);
    Q_INVOKABLE void minimize() const;
    void init();
    void log(QString str);
public slots:
        void cleanLastMsg() { lastPopup=""; }


private:
    QDeclarativeView *m_view;
    QString lastPopup;
    bool _switchToApp;
    QPiglerAPI api;
};

#endif // AVKONHELPER_H
