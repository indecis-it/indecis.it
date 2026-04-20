import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Title, Text, Grid, Paper } from '@mantine/core'
import { Footer } from '../components/Footer'

const CoherencePage: NextPage = () => {
  return (
    <Container size="lg" py="xl">
      <Head>
        <title>Analisi Coerenza | indecis.it 2.0</title>
        <meta
          name="description"
          content="Analisi della coerenza dei programmi elettorali secondo il metodo Converse (1964)"
        />
      </Head>

      <main>
        <Title order={1} mb="md">
          La Coerenza dei Programmi
        </Title>
        <Text size="lg" color="dimmed" mb="xl">
          Utilizziamo il concetto di &quot;constraint&quot; di Philip Converse
          (1964) per misurare quanto le posizioni di un partito su diversi temi
          siano correlate e ideologicamente strutturate.
        </Text>

        <Grid gutter="md">
          <Grid.Col span={12}>
            <Paper shadow="xs" p="md" withBorder>
              <Title order={3} mb="sm">
                Cos&apos;è il Vincolo Ideologico?
              </Title>
              <Text>
                Secondo Converse, un sistema di credenze ha un alto grado di
                vincolo (constraint) quando la conoscenza della posizione di un
                attore su un tema permette di prevedere con successo la sua
                posizione su altri temi correlati.
              </Text>
            </Paper>
          </Grid.Col>

          {/* Placeholder for the Matrix Visualization Component */}
          <Grid.Col span={12}>
            <Paper
              shadow="sm"
              p="xl"
              withBorder
              style={{
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
              }}
            >
              <Text color="gray" weight={500}>
                [Visualizzazione Matrice di Coerenza in fase di sviluppo]
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </main>

      <Footer />
    </Container>
  )
}

export default CoherencePage
