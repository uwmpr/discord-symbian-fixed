#ifndef CLIENT_H
#define CLIENT_H

#include <QtNetwork/QSslSocket>
#include <QAbstractSocket>
#include <QSslCipher>
#include "AvkonHelper.h"
class Socket : public QObject
{
    Q_OBJECT
public:
    Socket();
    ~Socket();
    Q_INVOKABLE void connectToServer(QString host, int port);
    Q_INVOKABLE void send(QString message);
public slots:
    void error();
    void readyRead();
    void sslHandshakeFailure(QList<QSslError> errors);
signals:
    void messageReceived(QString message);
    void errors();
private:
    QSslSocket *socket;
    QByteArray *buffer;
    AvkonHelper *avkon;
    QAbstractSocket *aSocket;
};

#endif // CLIENT_H
