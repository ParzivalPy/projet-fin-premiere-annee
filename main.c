#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>  // Pour mkdir
#include <sys/types.h> // Pour les permissions
#include "template.h" //Pour le fichier des template

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

void convert_choices_to_links(char *content)
{
    if (content == NULL)
    {
        return; // Gestion de l'entrée NULL
    }

    const char *search = "<a>";
    size_t search_len = strlen(search);

    // Calculer la taille maximale du nouveau contenu
    size_t original_len = strlen(content);
    size_t max_new_len = original_len + 256; // Ajouter un espace supplémentaire pour les remplacements
    char *new_content = (char *)malloc(max_new_len);
    if (new_content == NULL)
    {
        printf("Erreur : Impossible d'allouer de la mémoire.\n");
        return;
    }

    char *src = content;
    char *dst = new_content;

    while ((src = strstr(src, search)) != NULL)
    {
        // Copier le contenu avant "<a>"
        size_t bytes_to_copy = src - content;
        strncpy(dst, content, bytes_to_copy);
        dst += bytes_to_copy;

        // Rechercher le numéro de chapitre dans idref="XX"
        char *idref_start = strstr(content, "idref=\"");
        if (idref_start)
        {
            idref_start += 7; // Avancer après 'idref="'
            char chapter_id[MAX_ID];
            char *idref_end = strchr(idref_start, '"');
            if (idref_end)
            {
                size_t id_len = idref_end - idref_start;
                strncpy(chapter_id, idref_start, id_len);
                chapter_id[id_len] = '\0';

                // Construire le remplacement avec le numéro de chapitre
                char replacement[MAX_TITLE];
                snprintf(replacement, sizeof(replacement), "<a href=\"%s.html\">", chapter_id);
                size_t replacement_len = strlen(replacement);

                // Copier le remplacement dans le nouveau buffer
                strncpy(dst, replacement, replacement_len);
                dst += replacement_len;
            }
        }

        // Avancer après "<a>"
        src += search_len;
        content = src;
    }

    // Copier le reste du contenu
    strcpy(dst, content);

    // Remplacer le contenu original par le nouveau
    strcpy(content, new_content);

    // Libérer la mémoire temporaire
    free(new_content);
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
                convert_choices_to_links(content);
                FILE *out = fopen(filename, "w");
                if (out)
                {
                    fprintf(out, "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n<meta charset=\"UTF-8\">\n<title>%s</title>\n</head>\n<body>\n<h1>%s</h1>\n%s\n</body>\n</html>\n", title, title, content);
                    fclose(out);
                }
                content[0] = '\0';
            }
            // Extraire l'id et le titre
            sscanf(line, "<chapter id=\"%[^\"]\">%[^<]<", id, title);
            in_chapter = 1;
            content[0] = '\0';
        }
        else if (strncmp(line, "<chapter", 8) == 0)
        {
            // Ignore, déjà traité
        }
        else
        {
            if (in_chapter)
            {
                strcat(content, line);
            }
        }
    }
    // Dernier chapitre
    if (in_chapter)
    {
        char filename[256];
        snprintf(filename, sizeof(filename), "%s%s.html", output_dir, id); // Inclure le chemin
        convert_choices_to_links(content);
        FILE *out = fopen(filename, "w");
        if (out)
        {
            fprintf(out, "<!DOCTYPE html>\n<html lang=\"fr\">\n<head>\n<meta charset=\"UTF-8\">\n<title>%s</title>\n</head>\n<body>\n<h1>%s</h1>\n%s\n</body>\n</html>\n", title, title, content);
            fclose(out);
        }
    }

    fclose(in);
    printf("Chapitres exportés en HTML dans le dossier '%s'.\n", output_dir);
    return 0;

    
}