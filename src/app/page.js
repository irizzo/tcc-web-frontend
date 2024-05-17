import '@/styles/global.scss';
import './home.scss'

import LinkButton from '@/components/Buttons/LinkButton';

export default function Home() {
  // check if user's logged in, if so, redirect to dashboard

  return (
    <div className='flex home__container'>
      <nav className='home_menu'>
        <h2>Nome do Produto</h2>
        <LinkButton path='/' title='Login' variant='filled' small /> {/* link para login */} 
        <LinkButton path='/' title='Cadastro' variant='outlined' small /> {/* link para cadastro */}
      </nav>
      <main className='home__main'>
        <h1 className='home__main__title'>Nome do Produto</h1>
        <p className='home__main__subtitle'>Descrição do Produto</p>
        
        <LinkButton path='/contents' title="Começar" variant="filled"/>
      </main>
    </div>
  );
}
