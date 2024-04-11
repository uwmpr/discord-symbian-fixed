#include "sendfile.h"
#include <qdebug.h>
#include <QNetworkRequest>
#include <QSslConfiguration>
#include <QObject>
#include <QtWebKit/QWebView>
SendFile::SendFile(QObject *parent) :
    QObject(parent)
{
    QObject::connect(&manager, SIGNAL(finished(QNetworkReply*)),
             this, SLOT(sendfileslot(QNetworkReply*)));
}
void SendFile::sendFile(QString token, QString channel_id){
    qDebug() << token + channel_id;

    QString fileName = QFileDialog::getOpenFileName(this, tr("Open File"),
                                                    "",
                                                    tr(""));
    QFile file(fileName);
    if (!file.open(QIODevice::ReadOnly)){
        qDebug() << file.readAll();

    }
    QString str = file.fileName();
    QStringList parts = str.split("/");
    QString name = parts.at(parts.size()-1);
    QString boundary = "-----------------------------128617665714537629864265828537";

        
        QByteArray data(QString( boundary + "\r\n").toAscii());


        

        data += "Content-Disposition: form-data; name=\"file\"; filename=\"" + name + "\"\r\n";
        data += "Content-Type: application/octet-stream\r\n\r\n";


        data += file.readAll();
        file.close();
        data += "\r\n";
        data += "-----------------------------128617665714537629864265828537--";
        qDebug() << data;
    QNetworkRequest request;

     request.setUrl(QUrl("http://" + send + "/upload/" + channel_id));
     request.setRawHeader("auth", token);
    request.setRawHeader("Content-Type", "multipart/form-data; boundary=---------------------------128617665714537629864265828537");
    QNetworkReply *reply = manager.get(request);

}
void SendFile::sendfileslot(QNetworkReply* reply){
    qDebug() << reply->readAll();
}
