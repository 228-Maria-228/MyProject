using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using lab6library6;
using static lab6library6.Wisard;
using static lab6library6.Wisard.Necromancer;

namespace lab66666
{
    /// <summary>
    /// Логика взаимодействия для MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        List<Wisard> wisards = new List<Wisard>();
        Wisard wisard;
        Necromancer necromancer;
        Druid druid;
        public Random random = new Random();

        private void Save_Click(object sender, RoutedEventArgs e)
        {

            switch (Choose_mage.SelectedIndex)
            {
                case 1:
                    wisard = new Wisard();
                    wisard.Name = Name_checkbox.Text;
                    wisard.Element = Element.Text;
                    wisard.SetPredictionInfo();
                    wisards.Add(wisard);

                    switch (Element.SelectedIndex)
                    {
                        case 1:
                            ch.Content += wisard.Info1();
                            break;
                        case 2:
                            ch.Content += wisard.Info1();
                            break;
                        case 3:
                            ch.Content += wisard.Info1();
                            break;
                        case 4:
                            ch.Content += wisard.Info1();
                            break;
                        case 5:
                            ch.Content += wisard.Info1();
                            break;
                    }
                    break;
            
                case 2:
                    necromancer = new Necromancer();
                    necromancer.Name = Name_checkbox.Text;
                    necromancer.Element = Element.Text;
                    necromancer.SetPredictionInfo();
                    wisards.Add(necromancer);

                    switch (Element.SelectedIndex)
                    {
                        case 1:
                            ch.Content += necromancer.Info1();
                            break;
                        case 2:
                            ch.Content += necromancer.Info1();
                            break;
                        case 3:
                            ch.Content += necromancer.Info1();
                            break;
                        case 4:
                            ch.Content += necromancer.Info1();
                            break;
                        case 5:
                            ch.Content += necromancer.Info1();
                            break;
                    }
                    break;

                case 3:
                    druid = new Druid();
                    druid.Name = Name_checkbox.Text;
                    druid.Element = Element.Text;
                    druid.SetPredictionInfo();
                    druid.Age = Convert.ToInt32(Age_checkbox.Text);
                    wisards.Add(druid);

                    switch (Element.SelectedIndex)
                    {
                        case 0:
                            ch.Content += druid.Info1();
                            break;
                        case 1:
                            ch.Content += druid.Info1();
                            break;
                        case 2:
                            ch.Content += druid.Info1();
                            break;
                        case 3:
                            ch.Content += druid.Info1();
                            break;
                        case 4:
                            ch.Content += druid.Info1();
                            break;
                    }
                    break;

            }

        }


        private void CBThemes_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            switch (CBThemes.SelectedIndex)
            {
                case 1:
                    {
                        grid.Background = Brushes.Olive;
                        break;
                    }
                case 2:
                    {
                        grid.Background = Brushes.Turquoise;
                        break;
                    }
                case 3:
                    {
                        grid.Background = Brushes.Sienna;
                        break;
                    }
                case 4:
                    {
                        grid.Background = Brushes.Coral;
                        break;
                    }
            }
        }

        private void Choose_mage_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            switch (Choose_mage.SelectedIndex)
            {
                case 1:
                    {
                        Age_checkbox.IsEnabled = false;
                        break;
                    }
                case 2:
                    {
                        Age_checkbox.IsEnabled = false;
                        break;
                    }
                case 3:
                    {
                        Age_checkbox.IsEnabled = true;
                        break;
                    }
            }
        }

        private void Conclusion_Click(object sender, RoutedEventArgs e)
        {
            LabelMage.Content = "";
            foreach (Druid p in wisards)
                LabelMage.Content += p.Info2();
        }

        private void Prediction_Click(object sender, RoutedEventArgs e)
        {
            Prediction1.Content = "";
            foreach (Wisard p in wisards)
                Prediction1.Content += p.Info();
        }
    }
}
