#include "Socket.h"

Socket::Socket() {
    buffer = new QByteArray();
}

Socket::~Socket() {

}

void Socket::error(QAbstractSocket::SocketError error) {
    qDebug() << error;
}

void Socket::sslHandshakeFailure(QList<QSslError> errors) {
    socket->ignoreSslErrors();
}

void Socket::readyRead() {
    QByteArray data = socket->readAll();
    QList<QByteArray> msgs = data.split('\n');
    if (msgs.length() == 1) {
        buffer->append(data);
    } else {
        for (int i = 0; i < msgs.length() - 1; ++i) {
            buffer->append(msgs[i]);
            messageReceived(QString::fromUtf8(*buffer));
            delete buffer;
            buffer = new QByteArray();
        }
    }
}

void Socket::connectToServer(QString host, int port) {
    socket = new QSslSocket(this);
    connect(socket, SIGNAL(error(QAbstractSocket::SocketError)), this, SLOT(error(QAbstractSocket::SocketError)));
    connect(socket, SIGNAL(readyRead()), this, SLOT(readyRead()));
    connect(socket, SIGNAL(sslErrors(QList<QSslError>)), this, SLOT(sslHandshakeFailure(QList<QSslError>)));
    socket->setProtocol(QSsl::AnyProtocol);
    socket->ignoreSslErrors();
    socket->connectToHostEncrypted(host, port);
    if (!socket->waitForEncrypted())
        qWarning() << "Error:" << socket->errorString();
}

void Socket::send(QString message) {
    socket->write((message + "\n").toUtf8());
}
