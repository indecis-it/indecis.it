import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
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
import { hasCookie, getCookie, setCookie } from "cookies-next";
import { cookieDecode } from "../global/utils";

const useStyles = createStyles((theme) => ({
  banner: {
    backgroundColor: "white",
    width: "100%",
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    maxWidth: 960,
    zIndex: 3000,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      bottom: 20,
    },
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
  switches: {
    display: "flex",
    alignItems: "center",
    "& input": {
      cursor: "pointer",
    },
  },
}));

export const CookieBanner = () => {
  const router = useRouter();
  const hasCookies = hasCookie(COOKIE_KEY);
  const cookies = getCookie(COOKIE_KEY) as string;
  const initialCookieOptions = useMemo(
    () =>
      hasCookies
        ? cookieDecode(cookies)
        : {
            timestamp: Date.now(),
            purposes: { necessary: true, measurement: false },
          },
    [cookies, hasCookies]
  );
  const { classes } = useStyles();
  const [isCookieSet, setCookieSet] = useState(hasCookies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookieOptions, setCookieOptions] = useState(initialCookieOptions);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleSaveCookies = useCallback(
    (cookieChoice?: object) => {
      const choice = cookieChoice || cookieOptions;
      setCookie(COOKIE_KEY, choice, {
        path: "/",
        expires: new Date(Date.now() + 31536000000),
      });
      setCookieSet(true);
      setIsModalOpen(false);
      router.push(router.asPath);
    },
    [cookieOptions, router]
  );

  const handleCookieChoice = useCallback(
    (choice: boolean) => {
      const cookieChoice = {
        timestamp: Date.now(),
        purposes: {
          necessary: true,
          measurement: choice,
        },
      };
      setCookieOptions(cookieChoice);
      handleSaveCookies(cookieChoice);
    },
    [handleSaveCookies]
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
          funzionalit?? e svolgere le attivit?? sotto descritte. Puoi rivedere e
          modificare le tue scelte in qualsiasi momento. Tieni presente che il
          rifiuto del consenso per una finalit?? particolare pu?? rendere le
          relative funzioni non disponibili.
        </p>
      </Group>
      <Group>
        <Accordion chevronPosition="left" sx={{ width: "100%" }}>
          <Accordion.Item value="necessary">
            <div className={classes.switches}>
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
            <div className={classes.switches}>
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
            Torna indietro
          </Button>
        </div>
        <div>
          <Button
            onClick={() => handleSaveCookies()}
            color="indigo-green"
            size="sm"
          >
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
        <div className={classes.cookie}>
          <Button onClick={handleOpenPopup} variant="subtle" size="xs">
            <h1>????</h1>
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
                simili per finalit?? tecniche e, con il tuo consenso, anche per
                ???misurazione???. Il rifiuto del consenso pu?? rendere non
                disponibili le relative funzioni.
                <br /> Puoi liberamente prestare, rifiutare o revocare il tuo
                consenso, in qualsiasi momento.
                <br /> Usa il pulsante ???Accetta??? per acconsentire
                all&apos;utilizzo di tali tecnologie. Usa il pulsante ???Rifiuta???
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

