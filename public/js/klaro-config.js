// Config für Klaro Cookie Consent
window.klaroConfig = {
    version: 1,
    elementID: 'klaro',
    styling: {
        theme: ['light', 'top', 'wide'],
    },
    noAutoLoad: true,
    htmlTexts: true,
    embedded: false,
    groupByPurpose: true,
    storageMethod: 'cookie',
    cookieName: 'klaro',
    cookieExpiresAfterDays: 365,
    default: false,
    mustConsent: true,
    acceptAll: true,
    hideDeclineAll: false,
    hideLearnMore: false,
    translations: {
        de: {
            privacyPolicyUrl: 'https://perfectio-die-finanzmakler.de/datenschutz',
            consentModal: {
                title: 'Informationen die wir sammeln',
                description: 'Hier können Sie einsehen und anpassen, welche Information wir über Sie sammeln.\n',
            },
            purposes: {
                analytics: 'Besucher-Statistiken',
            },
            ok: 'Alle akzeptieren',
            save: 'Speichern',
            decline: 'Ablehnen',
            close: 'Schließen',
            service: {
                purpose: 'Zweck',
                purposes: 'Zwecke',
                required: {
                    title: 'Notwendig',
                    description: 'Diese Dienste sind für die korrekte Funktionsweise der Website notwendig.',
                },
            },
            googleAnalytics: {
                description: 'Sammeln von Besucherstatistiken',
            },
            poweredBy: 'Realisiert mit Klaro!',
        }
    },
    services: [
        {
            name: 'google-analytics',
            title: 'Google Analytics',
            purposes: ['analytics'],
            required: false,
            default: false,
            cookies: [
                [/^_ga.*$/i, '/', '.perfectio-die-finanzmakler.de'],
                [/^_gid.*$/i, '/', '.perfectio-die-finanzmakler.de'],
            ],
            callback: function(consent, service) {
                if (consent) {
                    // Execute analytics script if consent is given
                    const analyticsScript = document.querySelector('script[data-name="google-analytics"]');
                    if (analyticsScript) {
                        const scriptContent = analyticsScript.textContent;
                        if (scriptContent) {
                            const executeScript = new Function(scriptContent);
                            executeScript();
                        }
                    }
                } else {
                    // Remove analytics cookies if consent is withdrawn
                    const cookieNames = ['_ga', '_gid', '_gat'];
                    cookieNames.forEach(name => {
                        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.perfectio-die-finanzmakler.de`;
                    });
                }
            }
        }
    ]
};