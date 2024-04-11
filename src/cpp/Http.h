#ifndef HTTP_H
#define HTTP_H

#include <QNetworkAccessManager>
#include <QNetworkReply>
#include <QSslError>
#include <QString>
class Http : public QObject
{
    Q_OBJECT
public:
    Http();
    ~Http();
    Q_INVOKABLE void request(QString method, QString url, QString auth, QString body);

public slots:
    void sslErrors(QNetworkReply*,QList<QSslError>);
    void finished(QNetworkReply*);
signals:
    void requestFinished(QString body);
private:
    QNetworkAccessManager manager;
};

#endif // HTTP_H
