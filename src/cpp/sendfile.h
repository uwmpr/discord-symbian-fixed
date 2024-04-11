#ifndef SENDFILE_H
#define SENDFILE_H

#include <QObject>
#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QSslError>
#include <QString>
#include <QtWebKit/QWebView>
class SendFile : public QObject
{
    Q_OBJECT
public:
    explicit SendFile(QObject *parent = 0);
    Q_INVOKABLE void sendFile(QString token, QString channel_id, QString send);

signals:

public slots:
    void sendfileslot(QNetworkReply*);
    //void finished(QNetworkReply*);
private:
    QNetworkAccessManager manager;
    QWebView view;

};

#endif // SENDFILE_H
