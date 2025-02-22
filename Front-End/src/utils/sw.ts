/// <reference lib="webworker" />

self.addEventListener('push', function (event: any) {
    const payload = event.data ? event.data.text() : 'No payload';

    const options = {
        body: payload,
        icon: '../assets/icon/peoplequality.svg',
        badge: ''
    };

    event.waitUntil(
        (self as unknown as ServiceWorkerGlobalScope).registration.showNotification('Web Push Notification', options)
    );
});

(self as unknown as ServiceWorkerGlobalScope).addEventListener('notificationclick', function (event: NotificationEvent) {
    event.notification.close();
    // 在此处可以添加点击通知后的逻辑
});