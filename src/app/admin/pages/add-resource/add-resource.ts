import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../../authors/services/Author.service';
import { Author, BibleBook, Serie, Tag } from '../../../resources/interfaces/resource.interface';
import { ResourceService } from '../../../resources/services/resource.service';
import { NeutralButton } from '../../../components/neutral-button/neutral-button';
import 'cally';

@Component({
  selector: 'app-add-resource',
  imports: [ReactiveFormsModule, CommonModule, NeutralButton],
  templateUrl: './add-resource.html',
  styleUrl: './add-resource.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddResource implements OnInit {
  private fb = inject(FormBuilder);
  private authorService = inject(AuthorService);
  private resourceService = inject(ResourceService);

  authors = signal<Author[]>([]);
  bibleBooks = signal<BibleBook[]>([]);
  series = signal<Serie[]>([]);
  tags = signal<Tag[]>([]);
  chapters = signal<number[]>([]);
  verses = signal<number[]>([]);
  calendarOpened = signal(false);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    date: ['', Validators.required],
    authorId: ['', Validators.required],
    bibleBookId: ['', Validators.required],
    private: [false, Validators.required],
    serieId: ['', Validators.required],
    reference: ['', Validators.maxLength(30)],
    description: ['', Validators.minLength(10)],
    resume: ['', Validators.maxLength(250)],
    youtubeUrl: ['', Validators.minLength(10)],
    spotifyUrl: ['', Validators.minLength(10)],
    tagIds: [[] as string[]],
    chapter: [null as number | null],
    verseStart: [null as number | null],
    verseEnd: [null as number | null],
  });

  ngOnInit() {
    this.authorService.getAll().subscribe((res) => this.authors.set(res));
    this.resourceService.getBibleBooks().subscribe((res) => this.bibleBooks.set(res));
    this.resourceService.getSeries().subscribe((res) => this.series.set(res));
    this.resourceService.getTags().subscribe((res) => this.tags.set(res));
  }

  toggleTag(tagId: string) {
    const current = this.form.value.tagIds ?? [];
    const updated = current.includes(tagId)
      ? current.filter((id) => id !== tagId)
      : [...current, tagId];
    this.form.patchValue({ tagIds: updated });
  }

  isTagSelected(tagId: string) {
    return (this.form.value.tagIds ?? []).includes(tagId);
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { chapter, verseStart, verseEnd, ...rest } = this.form.value;
    const book = this.bibleBooks().find((b) => b.id === rest.bibleBookId);
    const payload = {
      ...rest,
      reference: chapter ? `${book?.title} ${chapter}:${verseStart}-${verseEnd}` : rest.reference,
    };
    console.log(payload);
  }

  onDateChange(event: Event) {
    const value = (event.target as HTMLElement & { value: string }).value;
    this.form.patchValue({ date: value });
    this.calendarOpened.set(false);
  }
  toggleCalendar() {
    this.calendarOpened.update((v) => !v);
  }
}
