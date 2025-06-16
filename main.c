#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>  // Pour mkdir
#include <sys/types.h> // Pour les permissions

#define MAX_LINE 2048
#define MAX_ID 32
#define MAX_TITLE 256
#define MAX_CONTENT 16384

void trim_newline(char *str)
{
    size_t len = strlen(str);
    while (len > 0 && (str[len - 1] == '\n' || str[len - 1] == '\r'))
    {
        str[--len] = '\0';
    }
}

int main()
{
    const char *output_dir = "export/"; // Dossier de destination

    // Créer le dossier de destination s'il n'existe pas
    struct stat st = {0};
    if (stat(output_dir, &st) == -1)
    {
        mkdir(output_dir, 0700); // Permissions : lecture/écriture/exécution pour le propriétaire
    }

    FILE *in = fopen("text.txt", "r");
    if (!in)
    {
        printf("Impossible d'ouvrir text.txt\n");
        return 1;
    }

    char line[MAX_LINE];
    char id[MAX_ID], title[MAX_TITLE];
    char content[MAX_CONTENT];
    char id_choice[MAX_ID];
    char title_choice[MAX_TITLE];
    int in_chapter = 0;

    while (fgets(line, sizeof(line), in))
    {
        if (strncmp(line, "<chapter id=\"", 13) == 0)
        {
            // Si on était déjà dans un chapitre, on écrit le fichier précédent
            if (in_chapter)
            {
                char filename[256];
                snprintf(filename, sizeof(filename), "%s%s.html", output_dir, id); // Inclure le chemin

                printf("content chapter: %s\n", content); // Afficher le contenu du chapitre pour vérification
                // printf("Content of chapter %s: %s\n", id, content); // Afficher le contenu du chapitre
                FILE *out = fopen(filename, "w");
                if (out)
                {
                    fprintf(out, "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n<meta charset=\"UTF-8\">\n<title>%s</title>\n<link rel=\"stylesheet\" href=\"../histoire.css\">\n<script src=\"../histoire.js\" defer></script>\n</head>\n<body>\n<h1> <img src=\"../ASSETS/img/casque.png\">Flamme du Nord <img src=\"../ASSETS/img/casque.png\"></h1>\n<div class=\"background-opacity\"></div>\n<h2>%s</h2>\n%s\n</body>\n</html>\n", title, title, content);
                    fclose(out);
                }
                content[0] = '\0'; // Réinitialiser le contenu pour le prochain chapitre
            }
            // Extraire l'id et le titre
            sscanf(line, "<chapter id=\"%[^\"]\">%[^<]<", id, title);
            in_chapter = 1;
            content[0] = '\0'; // Réinitialiser le contenu pour le nouveau chapitre
        }
        else if (strncmp(line, "<chapter", 8) == 0)
        {
            // Ignore, déjà traité
        }
        else if (strncmp(line, "<choice", 7) == 0)
        {
            sscanf(line, "<choice idref=\"%[^\"]\">%[^<]<", id_choice, title_choice);
            char choice_html[512];
            snprintf(choice_html, sizeof(choice_html), "<br /><choice idref=\"%s\">%s<a href=\"%s.html\">Chapitre %s</a></choice>", id_choice, title_choice, id_choice, id_choice);
            strcat(content, choice_html);
        }
        else
        {
            if (in_chapter)
            {
                strcat(content, line); // Ajouter la ligne au contenu du chapitre
            }
        }
    }

    // Dernier chapitre
    if (in_chapter)
    {
        char filename[256];
        snprintf(filename, sizeof(filename), "%s%s.html", output_dir, id); // Inclure le chemin
        FILE *out = fopen(filename, "w");
        if (out)
        {
            fprintf(out, "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n<meta charset=\"UTF-8\">\n<title>%s</title>\n<link rel=\"stylesheet\" href=\"../histoire.css\">\n<script src=\"../histoire.js\" defer></script>\n</head>\n<body>\n<h1><img src=\"../ASSETS/img/casque.png\"> Flamme du Nord <img src=\"../ASSETS/img/casque.png\"></h1>\n<div class=\"background-opacity\"></div>\n<h2>%s</h2>\n%s\n</body>\n</html>\n", title, title, content);
            fclose(out);
        }
    }

    fclose(in);
    printf("Chapitres exportés en HTML dans le dossier %s.\n", output_dir);
    return 0;
}