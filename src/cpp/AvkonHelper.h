#ifndef AVKONHELPER_H
#define AVKONHELPER_H

#include <QString>
#include <QObject>
#include <QNetworkAccessManager>
#include <QNetworkReply>
class QPiglerAPI;

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
    Q_INVOKABLE void clearAllNot();
    void gatewaydiscon();
    QPiglerAPI *api;

public slots:
        void cleanLastMsg() { lastPopup=""; }



private:
        void showNot(QString title, QString message);
        qint32 uid;
    QNetworkAccessManager *manager;
    QDeclarativeView *m_view;
    QString lastPopup;
    bool _switchToApp;
};

#endif // AVKONHELPER_H
