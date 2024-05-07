 #ifndef CLIENT_H
#define CLIENT_H

#include <QtNetwork/QSslSocket>
#include <QAbstractSocket>
#include <QSslCipher>
class Socket : public QObject
{
    Q_OBJECT
public:
    Socket();
    ~Socket();
    Q_INVOKABLE void connectToServer(QString host, int port);
    Q_INVOKABLE void send(QString message);
    Q_INVOKABLE void disconnectFromServer();
public slots:
    void error(QAbstractSocket::SocketError tcperror);
    void readyRead();
    void sslHandshakeFailure(QList<QSslError> errors);
signals:
    void messageReceived(QString message);
    void errors();
private:
    QSslSocket *socket;
    QByteArray *buffer;

};

#endif // CLIENT_H
