import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const games = [
  { id: 1, name: 'Valorant', icon: '🎯', category: 'FPS' },
  { id: 2, name: 'League of Legends', icon: '⚔️', category: 'MOBA' },
  { id: 3, name: 'CS:GO', icon: '💣', category: 'FPS' },
  { id: 4, name: 'Dota 2', icon: '🛡️', category: 'MOBA' },
  { id: 5, name: 'Overwatch', icon: '🎮', category: 'FPS' },
  { id: 6, name: 'Apex Legends', icon: '🔫', category: 'BR' },
];

const timeSlots = [
  '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'
];

const rules = [
  'Бронирование минимум за 24 часа',
  'Отмена возможна за 12 часов до начала',
  'Продолжительность сессии: 1-3 часа',
  'Обязательно Discord для связи',
  'Респект и позитив обязательны',
  'Токсичность = бан навсегда'
];

function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (!selectedDate || !selectedTime || !selectedGame) {
      toast({
        title: 'Ошибка',
        description: 'Выберите дату, время и игру',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Заявка отправлена! 🎮',
      description: `Жду тебя ${selectedDate.toLocaleDateString()} в ${selectedTime}`,
    });
    
    setBookingDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 w-full z-50 bg-card/90 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-glow text-primary">GAME SESSION</h1>
            <div className="flex gap-6">
              {['home', 'booking', 'games', 'about', 'rules', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-primary transition-colors ${
                    activeSection === section ? 'text-primary font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' ? 'Главная' : 
                   section === 'booking' ? 'Бронирование' :
                   section === 'games' ? 'Игры' :
                   section === 'about' ? 'Обо мне' :
                   section === 'rules' ? 'Правила' : 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-7xl font-bold mb-6 text-glow bg-gaming-gradient bg-clip-text text-transparent">
              ПОИГРАЕМ ВМЕСТЕ?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Забронируй время для совместной игровой сессии
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection('booking')}
                className="glow-neon-sm hover:glow-neon transition-all bg-primary text-primary-foreground"
              >
                <Icon name="Calendar" className="mr-2" />
                Забронировать
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection('games')}
                className="border-primary/50 hover:border-primary hover:glow-neon-sm transition-all"
              >
                <Icon name="Gamepad2" className="mr-2" />
                Посмотреть игры
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-glow text-primary">
            Бронирование
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card-gaming border-primary/30">
              <CardHeader>
                <CardTitle className="text-2xl">Выбери дату и время</CardTitle>
                <CardDescription>Доступные слоты подсвечены</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border border-primary/30"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Icon name="Clock" className="text-primary" />
                        Выбери время
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            onClick={() => setSelectedTime(time)}
                            className={selectedTime === time ? "glow-neon-sm bg-primary" : "border-primary/30 hover:border-primary"}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full glow-neon-sm bg-secondary text-secondary-foreground hover:glow-neon"
                          size="lg"
                        >
                          <Icon name="Send" className="mr-2" />
                          Отправить заявку
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-primary/30">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-primary">Заявка на игру</DialogTitle>
                          <DialogDescription>
                            Заполни форму и жди подтверждения
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleBooking} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Твоё имя</Label>
                            <Input id="name" name="name" placeholder="Как тебя зовут?" required />
                          </div>
                          <div>
                            <Label htmlFor="discord">Discord</Label>
                            <Input id="discord" name="discord" placeholder="username#0000" required />
                          </div>
                          <div>
                            <Label>Выбери игру</Label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                              {games.map((game) => (
                                <Button
                                  key={game.id}
                                  type="button"
                                  variant={selectedGame === game.id ? "default" : "outline"}
                                  onClick={() => setSelectedGame(game.id)}
                                  className={selectedGame === game.id ? "glow-neon-sm" : ""}
                                >
                                  {game.icon}
                                </Button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="message">Сообщение</Label>
                            <Textarea 
                              id="message" 
                              name="message" 
                              placeholder="Что хочешь сказать?"
                              rows={3}
                            />
                          </div>
                          <Button type="submit" className="w-full bg-primary text-primary-foreground glow-neon-sm">
                            Забронировать
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="games" className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-glow text-primary">
            Игры
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {games.map((game) => (
              <Card key={game.id} className="bg-card-gaming hover:glow-neon-sm transition-all cursor-pointer group">
                <CardHeader>
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {game.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {game.name}
                  </CardTitle>
                  <CardDescription>
                    <Badge variant="secondary" className="bg-secondary/20 text-secondary border border-secondary/50">
                      {game.category}
                    </Badge>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-glow text-primary">
            Обо мне
          </h2>
          <Card className="max-w-3xl mx-auto bg-card-gaming border-primary/30">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-32 h-32 rounded-full bg-gaming-gradient flex items-center justify-center text-6xl glow-neon">
                  🎮
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">Pro Gamer</h3>
                  <p className="text-muted-foreground mb-4">Топовый игрок | Стример | Тренер</p>
                </div>
                <p className="text-lg leading-relaxed">
                  Привет! Я играю уже более 8 лет и достиг высоких рангов в разных киберспортивных дисциплинах.
                  Люблю играть с новыми людьми, обучать и просто хорошо проводить время в играх.
                  Если ты хочешь подтянуть скилл или просто весело провести время — жду тебя!
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                  <Badge className="bg-primary/20 text-primary border border-primary glow-neon-sm">
                    <Icon name="Trophy" size={16} className="mr-1" />
                    Immortal в Valorant
                  </Badge>
                  <Badge className="bg-secondary/20 text-secondary border border-secondary glow-neon-sm">
                    <Icon name="Star" size={16} className="mr-1" />
                    Challenger в LoL
                  </Badge>
                  <Badge className="bg-accent/20 text-accent border border-accent glow-neon-sm">
                    <Icon name="Zap" size={16} className="mr-1" />
                    10k+ часов опыта
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="rules" className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-glow text-primary">
            Правила
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {rules.map((rule, index) => (
              <Card key={index} className="bg-card-gaming border-primary/30 hover:glow-neon-sm transition-all">
                <CardContent className="flex items-center gap-4 pt-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary glow-neon-sm">
                    {index + 1}
                  </div>
                  <p className="text-lg">{rule}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-12 text-glow text-primary">
            Контакты
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card-gaming border-primary/30">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/30 hover:glow-neon-sm transition-all">
                    <Icon name="MessageCircle" size={32} className="text-primary" />
                    <div>
                      <p className="font-semibold">Discord</p>
                      <p className="text-muted-foreground">ProGamer#1337</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/10 border border-secondary/30 hover:glow-neon-sm transition-all">
                    <Icon name="Mail" size={32} className="text-secondary" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">progamer@gaming.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/10 border border-accent/30 hover:glow-neon-sm transition-all">
                    <Icon name="Youtube" size={32} className="text-accent" />
                    <div>
                      <p className="font-semibold">YouTube</p>
                      <p className="text-muted-foreground">@ProGamerTV</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/30 hover:glow-neon-sm transition-all">
                    <Icon name="Twitch" size={32} className="text-primary" />
                    <div>
                      <p className="font-semibold">Twitch</p>
                      <p className="text-muted-foreground">twitch.tv/progamer</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-card border-t border-primary/20 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Game Session. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}

export default Index;
