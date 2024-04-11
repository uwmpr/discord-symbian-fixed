#include "Http.h"
#include <QNetworkRequest>
#include <QDebug>
#include <QSslConfiguration>
#include <QObject>

Http::Http() {
    qDebug() << "Created HTTP instance.";
    connect(&manager, SIGNAL(sslErrors(QNetworkReply*,QList<QSslError>)), this, SLOT(sslErrors(QNetworkReply*,QList<QSslError>)));
    connect(&manager, SIGNAL(finished(QNetworkReply*)), this, SLOT(finished(QNetworkReply*)));
}

Http::~Http() {

}

void Http::finished(QNetworkReply* reply) {
    requestFinished(QString(reply->readAll()));
}

void Http::sslErrors(QNetworkReply* reply, QList<QSslError> errors) {
    reply->ignoreSslErrors();
}

void Http::request(QString method, QString url, QString auth, QString body) {
    QNetworkRequest request;
    QNetworkReply *reply;
    request.setUrl(url);
    request.setRawHeader("Authorization", auth.toUtf8());
    if (!body.isEmpty()) {
        request.setRawHeader("Content-Type", "application/json");
    }

    if (method == "GET") {
        reply = manager.get(request);
    } else {
        reply = manager.post(request, body.toUtf8());
    }
    QSslConfiguration sslConfguration;
    sslConfguration.setProtocol(QSsl::AnyProtocol);
    reply->setSslConfiguration(sslConfguration);
}

