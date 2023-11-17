#include <QtGui/QApplication>
#include <QDeclarativeContext>

#include "qmlapplicationviewer.h"

#include "cpp/Socket.h"
#include "cpp/Http.h"
#include "cpp/AvkonHelper.h"

Q_DECL_EXPORT int main(int argc, char *argv[])
{
    QScopedPointer<QApplication> app(createApplication(argc, argv));

    QmlApplicationViewer viewer;
    Socket socket;
    Http http;
    AvkonHelper avkon(&viewer);
    avkon.init();
    viewer.rootContext()->setContextProperty("http", &http);
    viewer.rootContext()->setContextProperty("avkon", &avkon);
    viewer.rootContext()->setContextProperty("socket", &socket);
    viewer.rootContext()->setContextProperty("viewer", &viewer);

    viewer.setMainQmlFile(QLatin1String("js/ui/launcher.qml"));
    viewer.showExpanded();

    return app->exec();
}

