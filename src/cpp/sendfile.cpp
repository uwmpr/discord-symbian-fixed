#include "sendfile.h"
#include <qdebug.h>
#include <QNetworkRequest>
#include <QSslConfiguration>
#include <QObject>
#include <QtWebKit/QWebView>
#include <QFileDialog>
#include <QFile>
#include <QMessageBox>
SendFile::SendFile(QObject *parent) :
    QObject(parent)
{
    QObject::connect(&manager, SIGNAL(finished(QNetworkReply*)),
             this, SLOT(sendfileslot(QNetworkReply*)));

}
void SendFile::sendFile(QString token, QString channel_id, QString sendProxy){

        QNetworkReply *reply;

    //qDebug() << token + channel_id;

    QString fileName = QFileDialog::getOpenFileName();
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

    request.setUrl(QUrl("http://" + sendProxy + "/upload/" + channel_id + "/"));
     request.setRawHeader("auth", token.toUtf8());
    request.setRawHeader("Content-Type", "multipart/form-data; boundary=---------------------------128617665714537629864265828537");
    //qDebug() << "http://" + sendProxy + "/upload/" + channel_id + "/";
    reply = manager.post(request, data);



}
void SendFile::sendfileslot(QNetworkReply* reply){

    QMessageBox msgbox;
    if(reply->readAll() == "file sent!"){
        msgbox.setText("File sent!");
        msgbox.exec();
    }else {
        msgbox.setText("Failed to sent file");
        msgbox.exec();
    }

}

