import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Accordion,
  Button,
  createStyles,
  Divider,
  Group,
  Modal,
  Switch,
} from "@mantine/core";
import { COOKIE_KEY } from "../global/constants";
import { getCookie, setCookie } from "cookies-next";

const useStyles = createStyles((theme) => ({
  banner: {
    backgroundColor: "white",
    width: "100%",
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: 960,
    zIndex: 3000,
  },
  content: {
    fontSize: 12,
    boxShadow: "0 8px 48px rgba(0,0,0,.15)",
    padding: 15,
  },
  title: {
    fontWeight: 600,
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      marginRight: 10,
      borderRadius: 50,
    },
  },
  cookie: {
    zIndex: 3000,
    position: "fixed",
    bottom: 50,
    right: 15,
    "& button": {
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  },
}));

export const CookieBanner = () => {
  const cookies = getCookie(COOKIE_KEY);
  const initialCookieOptions = useMemo(() => {
    return {
      timestamp: Date.now(),
      purposes: { necessary: true, measurement: false },
    };
  }, []);
  const { classes } = useStyles();
  const [isCookieSet, setCookieSet] = useState(!!cookies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookieOptions, setCookieOptions] = useState(initialCookieOptions);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleCookieChoice = useCallback(
    (choice: boolean) => {
      const cookieChoice = choice ? cookieOptions : initialCookieOptions;
      setCookie(COOKIE_KEY, cookieChoice, { path: "/" });
      setCookieSet(true);
    },
    [cookieOptions, initialCookieOptions]
  );

  const handleOpenPopup = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  const handleCookieOptionChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setCookieOptions({
        timestamp: Date.now(),
        purposes: {
          ...cookieOptions.purposes,
          [e.currentTarget.name]: e.currentTarget.checked,
        },
      });
    },
    [cookieOptions.purposes]
  );

  const PreferencesModal = () => (
    <Modal
      centered
      zIndex={3000}
      overflow="inside"
      withCloseButton={false}
      opened={isModalOpen}
      closeOnClickOutside={false}
      onClose={handleOpenPopup}
      size="xl"
    >
      <Group>
        <h1>Le tue preferenze relative al consenso</h1>
        <p>
          Il seguente pannello ti consente di esprimere le tue preferenze di
          consenso alle tecnologie di tracciamento che adottiamo per offrire le
          funzionalità e svolgere le attività sotto descritte. Puoi rivedere e
          modificare le tue scelte in qualsiasi momento. Tieni presente che il
          rifiuto del consenso per una finalità particolare può rendere le
          relative funzioni non disponibili.
        </p>
      </Group>
      <Group position="right">
        <Button onClick={handleOpenPopup} color="gray" size="sm">
          Rifiuta tutto
        </Button>
        <Button onClick={handleOpenPopup} color="gray" size="sm">
          Accetta tutto
        </Button>
      </Group>
      <Divider
        my="sm"
        style={{
          borderTopColor: "transparent",
          marginTop: 20,
        }}
      />
      <Group>
        <Accordion chevronPosition="left" sx={{ width: "100%" }}>
          <Accordion.Item value="necessary">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Accordion.Control>Strettamente necessari</Accordion.Control>
              <Switch
                disabled
                name="necessary"
                checked={cookieOptions?.purposes?.necessary}
                size="lg"
              />
            </div>
            <Accordion.Panel>
              Questi strumenti di tracciamento sono strettamente necessari per
              garantire il funzionamento e la fornitura del servizio che ci hai
              richiesto e, pertanto, non richiedono il tuo consenso.
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="measurement">
            <div style={{ display: "flex", alignItems: "center" }}>
              <Accordion.Control>Misurazione</Accordion.Control>
              <Switch
                name="measurement"
                color="indigo-green"
                onChange={handleCookieOptionChange}
                checked={cookieOptions?.purposes?.measurement}
                size="lg"
              />
            </div>
            <Accordion.Panel>
              Questi strumenti di tracciamento ci permettono di misurare il
              traffico e analizzare il tuo comportamento con l&apos;obiettivo di
              migliorare il nostro servizio.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Group>
      <Divider
        my="sm"
        style={{
          borderTopColor: "transparent",
          marginTop: 20,
        }}
      />
      <Group className={classes.buttons}>
        <div>
          <Button onClick={handleOpenPopup} color="gray" size="sm">
            Salva e torna indietro
          </Button>
        </div>
        <div>
          <Button onClick={handleOpenPopup} color="indigo-green" size="sm">
            Salva e continua
          </Button>
        </div>
      </Group>
      <Divider
        my="sm"
        style={{
          borderTopColor: "transparent",
          marginTop: 0,
        }}
      />
    </Modal>
  );

  const CookieBanner = useMemo(
    () =>
      isCookieSet ? (
        <div suppressHydrationWarning={true} className={classes.cookie}>
          <Button onClick={handleOpenPopup} variant="subtle" size="xs">
            <h1>🍪</h1>
          </Button>
        </div>
      ) : (
        <div className={classes.banner}>
          <div className={classes.content}>
            <div>
              <Image
                src={`/indecis-it-logo-diff.svg`}
                alt="Il logo di indecis.it"
                height={45}
                width={45}
              />
            </div>
            <div>
              <p className={classes.title}>Informativa</p>
              <p>
                Noi e terze parti selezionate utilizziamo cookie o tecnologie
                simili per finalità tecniche e, con il tuo consenso, anche per
                “misurazione”. Il rifiuto del consenso può rendere non
                disponibili le relative funzioni.
                <br /> Puoi liberamente prestare, rifiutare o revocare il tuo
                consenso, in qualsiasi momento.
                <br /> Usa il pulsante “Accetta” per acconsentire
                all&apos;utilizzo di tali tecnologie. Usa il pulsante “Rifiuta”
                per continuare senza accettare.
              </p>
            </div>
            <div className={classes.buttons}>
              <div>
                <Button onClick={handleOpenPopup} color="gray" size="sm">
                  Personalizza
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => handleCookieChoice(false)}
                  color="indigo-green"
                  size="sm"
                >
                  Rifiuta
                </Button>
                <Button
                  onClick={() => handleCookieChoice(true)}
                  color="indigo-green"
                  size="sm"
                >
                  Accetta
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
    [classes, handleCookieChoice, handleOpenPopup, isCookieSet]
  );

  return hydrated ? (
    <>
      {CookieBanner}
      <PreferencesModal />
    </>
  ) : null;
};

