package fr.omatech.ordernow.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Menu.
 */
@Entity
@Table(name = "menu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tittle")
    private String tittle;

    @OneToMany(mappedBy = "menu")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Formula> listFormules = new HashSet<>();

    @OneToMany(mappedBy = "menu")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MenuCategory> listCategories = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("listMenus")
    private Restaurant restaurant;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTittle() {
        return tittle;
    }

    public Menu tittle(String tittle) {
        this.tittle = tittle;
        return this;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public Set<Formula> getListFormules() {
        return listFormules;
    }

    public Menu listFormules(Set<Formula> formulas) {
        this.listFormules = formulas;
        return this;
    }

    public Menu addListFormule(Formula formula) {
        this.listFormules.add(formula);
        formula.setMenu(this);
        return this;
    }

    public Menu removeListFormule(Formula formula) {
        this.listFormules.remove(formula);
        formula.setMenu(null);
        return this;
    }

    public void setListFormules(Set<Formula> formulas) {
        this.listFormules = formulas;
    }

    public Set<MenuCategory> getListCategories() {
        return listCategories;
    }

    public Menu listCategories(Set<MenuCategory> menuCategories) {
        this.listCategories = menuCategories;
        return this;
    }

    public Menu addListCategory(MenuCategory menuCategory) {
        this.listCategories.add(menuCategory);
        menuCategory.setMenu(this);
        return this;
    }

    public Menu removeListCategory(MenuCategory menuCategory) {
        this.listCategories.remove(menuCategory);
        menuCategory.setMenu(null);
        return this;
    }

    public void setListCategories(Set<MenuCategory> menuCategories) {
        this.listCategories = menuCategories;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Menu restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Menu)) {
            return false;
        }
        return id != null && id.equals(((Menu) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Menu{" +
            "id=" + getId() +
            ", tittle='" + getTittle() + "'" +
            "}";
    }
}
